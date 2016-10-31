# react-native-stylish
Easy to use declarative transitions and a standard set of animations for React Native

## Installation
Stylish
`$ npm install react-native-stylish --save`

## Usage

To animate things you must use the `createStylishComponent` composer similar to the `Animated.createAnimatedComponent`. The common components `View`, `Text` and `Image` are precomposed and exposed under the `Stylish` namespace. If you have your own component that you wish to animate, simply wrap it with a `Stylish.View` or compose it with:

```js
import * as Stylish from 'react-native-stylish';
MyCustomComponent = Stylish.createStylishComponent(MyCustomComponent);
```

### Declarative Usage

#### Generic transitions

You can create your own simple transitions of a style property of your own choosing. The following example will increase the font size by 5 for every tap – all animated, all declarative! If you don't supply a `duration` property, a spring animation will be used.

*Note: If you are using colors, please use `rgba()` syntax.*

*Note: Transitions require `StyleSheet.flatten` available in React Native 0.15 or later. If you are running on anything lower, please polyfill as described under imperative usage.*


```html
<TouchableOpacity onPress={() => this.setState({fontSize: (this.state.fontSize || 10) + 5 })}>
  <Stylish.Text transition="fontSize" style={{fontSize: this.state.fontSize || 10}}>Size me up, Scotty</Stylish.Text>
</TouchableOpacity>
```

#### Properties
*Note: Other properties will be passed down to underlying component.*

| Prop | Description | Default |
|---|---|---|
|**`animationConfig`**|Name of the animation, see below for available animations. |*None*|

### Imperative Usage


#### Predefined Animations

All animations are exposed as functions on Stylish elements, they take an optional `duration` argument. They return a promise that is resolved when animation completes successfully or is cancelled.

```js
import * as Stylish from 'react-native-Stylish';

class ExampleView extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.refs.view.bounce(800).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled');}>
        <Stylish.View ref="view">
          <Text>Bounce me!</Text>
        </Stylish.View>
      </TouchableWithoutFeedback>
    );
  }
}
```

To stop any ongoing animations, just invoke `stopAnimation()` on that element.

#### Generic transitions

##### `animate(fromValues, toValues)`

Will transition between given styles. If no `duration` or `easing` is passed a spring animation will be used.

##### `animateTo(toValues[[, duration], easing])`

This function will try to determine the current styles and pass it along to `transition()` as `fromValues`.

```js
import * as Stylish from 'react-native-Stylish';

class ExampleView extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.refs.text.animateTo({opacity: 0.2});}>
        <Stylish.Text ref="text">Fade me!</Stylish.Text>
      </TouchableWithoutFeedback>
    );
  }
}
```

## Demo / Example

See `Example` folder.

![Stylish-demo](https://cloud.githubusercontent.com/assets/378279/10629128/3c373324-779a-11e5-8311-a3a489575b75.gif)

## [Changelog](https://github.com/uk-ar/react-native-stylish/releases)

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Yuuki Arisawa 2016
