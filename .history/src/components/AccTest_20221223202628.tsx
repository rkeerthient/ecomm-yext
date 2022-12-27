import React, { View , Text} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
 
const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];
 
class AccordionView  {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }
 
  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }
 
  render {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}