import React from 'react';
import styleEqual from 'style-equal';

import {
  StyleSheet,
  Animated,
  View,
  Text,
  Image,
  ListView,
  InteractionManager,
} from 'react-native';

function createStylishComponent(component){
  const Animatable = Animated.createAnimatedComponent(component);
  return class StylishComponent extends React.Component {
    static propTypes = {
      animationConfig: React.PropTypes.object,//TimingAnimationConfigSingle,
    };
    static defaultProps = {
      animationConfig: {},
    };
    constructor(props) {
      super(props);
      this.state = {
        animatedStyle: props.style &&
                       StyleSheet.flatten(props.style)
      };
      this.prevStyle = this.state.animatedStyle;
      // console.log("const")
    }
    componentWillReceiveProps(nextProps) {
      if(!styleEqual(this.props.style, nextProps.style)){
        this.animateTo(nextProps.style);
      }
    }
    animate(fromValues, toValues,onComplete) {
      this.prevStyle = fromValues;
      return this.animateTo(toValues,onComplete);
    }
    animateTo(nextStyle,onComplete) {
      return this.getAnimationTo(nextStyle).start(onComplete)
    }
    getAnimation(fromValues, toValues){
      this.prevStyle = fromValues;
      return this.getAnimationTo(toValues);
    }
    // https://github.com/joshwcomeau/react-flip-move#enterleave-animations
    getAnimationTo(nextStyle){
      return {
        start:(onComplete)=>{
          // duration,easing jquery
          console.log('animate');
          // this.animating = true;
          this.counter = new Animated.Value(0);
          const current = StyleSheet.flatten(this.prevStyle);
          const next = StyleSheet.flatten(nextStyle) || {};
          // console.log("next?",next)
          const animatedStyle =
            Object.keys(next)
                  .filter(key =>
                    (typeof next[key] === 'number' ||
                     key.toLowerCase().endsWith('color')) && current[key]
                  )
                  .reduce((acc, key) => {
                    // console.log('key', key, acc);
                    acc[key] = this.counter.interpolate({
                      inputRange: [0, 1],
                      outputRange: [current[key], next[key]],
                    });
                    return acc;
                  }, {});
          if (next.transform && current.transform) {
            const transforms = next.transform.map((obj) => {
              return Object
                .keys(obj)
                .filter(key =>
                  (typeof obj[key] === 'number' ||
                   key.toLowerCase().endsWith('color')) && current.transform[0][key]
                ).reduce((acc, key) => {
                  // console.log('key', key, acc,current.transform[0][key], obj[key]);
                  acc[key] = this.counter.interpolate({
                    inputRange: [0, 1],
                    outputRange: [current.transform[0][key], obj[key]],
                  });
                  return acc;
                }, {});
            });
            animatedStyle.transform = transforms;
          }
          // TimingAnimationConfigSingle
          this.prevStyle = next;
          const animationConfig = this.props.animationConfig;
          //return new Promise((resolve, reject) => {
          this.setState({ animatedStyle }, () => {
            //InteractionManager.runAfterInteractions(() => {
                Animated.timing(
                  this.counter,
                  { ...animationConfig, toValue: 1 }// useNativeDriver: true android only
                ).start(onComplete);
                /* setTimeout(()=>
                 *   )*/
              });
        //})
          //});
        }
      }
    }
    setNativeProps(props) {
      // for Touchable
      this.refs.root.setNativeProps(props);
    }
    render() {
      const { style, animationConfig, ...props } = this.props;
      // console.log("foo",style,props,this.state.animatedStyle)
      // return null
      return (
        // style={[this.state.style,]}
        <Animatable
          ref="root"
          {...props}
          style={[style, this.state.animatedStyle]}
        />
      );
    }
  }
}

module.exports = {
  View: createStylishComponent(View),
  Text: createStylishComponent(Text),
  Image: createStylishComponent(Image),
  ListView: createStylishComponent(ListView),
  createStylishComponent
};
