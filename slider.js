'use strict'

var React = require('react-native');
var {
    Text,
    View,
    Animated,
    PanResponder,
    Dimensions
} = React;

var deviceWidth = Dimensions.get('window').width;

var TabSliderView = React.createClass({
    getInitialState: function() {
        return {
            pan: new Animated.ValueXY(),
            index: 1
        };
    },
    componentWillMount: function() {
        this._animatedValueX = 0;
        var tW = deviceWidth * this.props.tabWidth;
        this.state.pan.x.addListener(
            (value) => this._animatedValueX = value.value
        );
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({
                    x: this._animatedValueX
                });
                this.state.pan.setValue({x: 0});
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x},
            ]),
            onPanResponderRelease: (e, gestureState) => {
                var distance = 0;
                var relative = gestureState.dx / deviceWidth;
                var vx = gestureState.vx;
                if (relative < -0.5 || (relative < 0 && vx <= -0.5)) {
                    if (this.state.index >= 1 && this.state.index < 5) {
                        this.state.index += 1;
                        distance = -tW;
                    }
                } else if (relative > 0.5 || (relative > 0 && vx >= 0.5)) {
                    if (this.state.index > 1 && this.state.index <= 5) {
                        this.state.index -= 1;
                        distance = tW;
                    }
                }
                if (distance != 0) {
                    this.props.onTabChange(
                        this.props.tabs[this.state.index - 1]
                    );
                }
                Animated.spring(this.state.pan, {
                    toValue: distance
                }).start();
            }
        });
    },
    componentWillUnmount: function() {
        this.state.pan.x.removeAllListener();
    },
    getSliderStyle: function() {
        var tP = deviceWidth * (1 - this.props.tabWidth) * 0.5;
        return [
            this.props.sliderStyle,
            {
                width: deviceWidth*this.props.tabWidth * this.props.tabs.length + tP * 2,
                paddingLeft: tP,
                paddingRight: tP,
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
            }, {
                transform: [
                    {
                        translateX: this.state.pan.x
                    }
                ]
            },
        ];
    },
    render: function() {
        return (
            <View style={[this.props.containerStyle]}>
                <Animated.View
                    style={this.getSliderStyle()}
                    {...this._panResponder.panHandlers}>
                    {this.props.tabs.map(this.createTab)}
                </Animated.View>
            </View>
        )
    },
    createTab: function(item, i) {
        return (
            <Text style={[
                    this.props.textStyle,
                    {width: deviceWidth * this.props.tabWidth}
                ]}>
                {item}
            </Text>
        );
    },
});

module.exports = TabSliderView;
