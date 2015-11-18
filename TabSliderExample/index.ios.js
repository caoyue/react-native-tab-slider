'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = React;

var TabSliderView = require('./slider')

var MOCK_DATA = ["Tab A", "Tab B", "Tab C", "Tab D"];

var TabSliderExample = React.createClass({
    getInitialState: function() {
        return {
            tabs: MOCK_DATA,
            currentTab: MOCK_DATA[0]
        }
    },
    render: function() {
        return (
            <View style={{flex: 1}}>
                <TabSliderView
                    tabs={this.state.tabs}
                    tabWidth={0.5}
                    onTabChange={(t) => this.onTabChange(t)}
                    containerStyle={styles.container}
                    sliderStyle={styles.slider}
                    textStyle={styles.text}
                    >
                </TabSliderView>
                <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{fontSize: 30}}>
                        {this.state.currentTab}
                    </Text>
                </View>
            </View>
        );
    },
    onTabChange:function(t) {
        this.setState({
            currentTab: t
        });
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: "#333",
        marginTop: 20
    },
    slider: {
        backgroundColor: '#333',
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '200',
        textAlign: 'center'
    },
});


AppRegistry.registerComponent('TabSliderExample', () => TabSliderExample);
