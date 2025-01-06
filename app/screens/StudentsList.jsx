import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Checkbox, PaperProvider } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import StudentCard from '../components/StudentCard';
import studentsData from '../data/students.json';
const StudentsList = () => {
  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => {}} iconColor={Colors.black} />
        <Appbar.Content title="👩🏻‍🎓 Student List" titleStyle={{ color: '#000' }} />
        <Appbar.Action icon="magnify" onPress={() => {}} iconColor={Colors.black} />
        <Appbar.Action icon="filter-outline" onPress={() => {}} iconColor={Colors.black} />
      </Appbar.Header>
      <View style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: Colors.black }}>
              All Students
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                backgroundColor: Colors.black,
                marginLeft: 5,
                paddingLeft: 4,
                paddingTop: 0,
                paddingBottom: 0,
                alignSelf: 'center',
                borderRadius: 4,
                paddingRight: 4,
              }}
            >
              {studentsData.length}
            </Text>
          </View>
          <Checkbox></Checkbox>
        </View>
        <ScrollView>
          {studentsData.map((student, index) => {
            return (
              <TouchableOpacity key={index}>
                <StudentCard student={student} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default StudentsList;
