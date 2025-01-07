import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Appbar, Checkbox, PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CreateStudent from '../components/CreateStudent';
import EditStudent from '../components/EditStudent';
import StudentCard from '../components/StudentCard';
import studentsData from '../data/students.json';
import { localImages } from '../utils/imageMapping';
const StudentsList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  const bottomSheetRef = useRef(null);
  const editBottomSheetRef = useRef(null);
  const createBottomSheetRef = useRef(null);

  const initializeStudents = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setStudents(JSON.parse(storedUsers));
      } else {
        await AsyncStorage.setItem('users', JSON.stringify(studentsData));
        setStudents(studentsData);
      }
    } catch (error) {
      console.error('Error initializing students:', error);
    }
  };

  useEffect(() => {
    initializeStudents();
  }, []);

  const showBottomSheet = (student) => {
    console.log('showBottomSheet', bottomSheetRef);
    setSelectedStudent(student);
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobileNumber.includes(searchQuery)
    );
  });

  const hideBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsSheetOpen(false);
    setSelectedStudent(null);
  };

  const showEditBottomSheet = (student) => {
    setIsEditSheetOpen(true);
    editBottomSheetRef.current?.expand();
    setEditedStudent(student);
  };

  const hideEditBottomSheet = () => {
    editBottomSheetRef.current?.close();
    setIsEditSheetOpen(false);
  };

  const showCreateBottomSheet = () => {
    console.log(createBottomSheetRef);
    setIsCreateSheetOpen(true);
    createBottomSheetRef.current?.expand();
  };

  const hideCreateBottomSheet = () => {
    createBottomSheetRef.current?.close();
    setIsCreateSheetOpen(false);
  };

  const updateStudentsInStorage = async (updatedStudents) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedStudents));
    } catch (error) {
      console.error('Error updating students in storage:', error);
    }
  };

  const handleSaveChanges = () => {
    const updatedStudents = students.map((student) =>
      student.id === editedStudent.id ? editedStudent : student
    );
    setStudents(updatedStudents);
    updateStudentsInStorage(updatedStudents);
    initializeStudents();
    hideEditBottomSheet();
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      setEditedStudent((prevState) => ({
        ...prevState,
        dateOfBirth: formattedDate,
      }));
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleCreateStudent = async (newStudent) => {
    try {
      if (!newStudent.name.trim()) {
        alert('Student name is required.');
        return;
      }
      if (!newStudent.mobileNumber.trim() || newStudent.mobileNumber.length !== 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!newStudent.email.trim() || !/\S+@\S+\.\S+/.test(newStudent.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      if (!newStudent.dateOfBirth) {
        newStudent.dateOfBirth == '2023-06-10';
      }
      for (let i = 0; i < newStudent.parentDetails.length; i++) {
        const guardian = newStudent.parentDetails[i];
        if (!guardian.guardianName.trim()) {
          alert(`Guardian ${i + 1} name is required.`);
          return;
        }

        if (!guardian.guardianMobile.trim() || guardian.guardianMobile.length !== 10) {
          alert(`Guardian ${i + 1} must have a valid 10-digit mobile number.`);
          return;
        }

        if (!guardian.guardianEmail.trim() || !/\S+@\S+\.\S+/.test(guardian.guardianEmail)) {
          alert(`Guardian ${i + 1} must have a valid email address.`);
          return;
        }
      }

      const storedStudents = await AsyncStorage.getItem('users');
      const students = storedStudents ? JSON.parse(storedStudents) : [];
      const updatedStudents = [...students, newStudent];
      await AsyncStorage.setItem('users', JSON.stringify(updatedStudents));
      alert('Student created and saved successfully!');
      initializeStudents();
      hideCreateBottomSheet();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Failed to save the student. Please try again.');
    }
  };

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <Appbar.Header style={{ backgroundColor: Colors.white }}>
          <Appbar.BackAction onPress={() => {}} iconColor={Colors.black} />
          <Appbar.Content title="👩🏻‍🎓 Student List" titleStyle={{ color: '#000' }} />
          <Appbar.Action
            icon="magnify"
            onPress={() => setIsSearchVisible(!isSearchVisible)}
            iconColor={Colors.black}
          />
          <Appbar.Action icon="filter-outline" onPress={() => {}} iconColor={Colors.black} />
        </Appbar.Header>

        <View style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}>
          {isSearchVisible && (
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: '#D3D3D3',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
                fontSize: 16,
                color: '#000',
                placholderTextColor: '#000',
              }}
              placeholder="Search by Name, Reg No, or Mobile"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          )}

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
                {filteredStudents.length}
              </Text>
            </View>
            <Checkbox></Checkbox>
          </View>

          <ScrollView>
            {students.map((student, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    showBottomSheet(student);
                  }}
                >
                  <StudentCard student={student} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={showCreateBottomSheet}
          >
            <MaterialCommunityIcons name="plus-circle" size={60} color="black" />
          </TouchableOpacity>
        </View>
        {isSheetOpen && (
          <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={10} />
        )}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['30%', '50%', '50%']}
          enableDynamicSizing={false}
          handleIndicatorStyle={{ backgroundColor: Colors.white }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.black }}>
              Personal Information
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={26}
                color="#000"
                onPress={() => {
                  showEditBottomSheet(selectedStudent);
                }}
              />
              <MaterialCommunityIcons
                name="account-check-outline"
                size={26}
                style={{ paddingLeft: 10 }}
                color="#000"
                onPress={hideBottomSheet}
              />
            </View>
          </View>

          <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
            {selectedStudent ? (
              <View
                style={{ borderWidth: 0.7, borderColor: '#D3D3D3', padding: 20, borderRadius: 8 }}
              >
                <Image
                  source={localImages[selectedStudent.profilePicture]}
                  style={{ height: 50, width: 50 }}
                ></Image>
                <Text
                  style={{ fontSize: 22, fontWeight: 'bold', color: Colors.black, paddingTop: 5 }}
                >
                  {selectedStudent.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#808080' }}>Registration No.</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.black }}>
                      {selectedStudent.registrationNumber}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#808080' }}>Date of Birth</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.black }}>
                      {selectedStudent.dateOfBirth}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#808080' }}>Mobile</Text>
                    <Text
                      style={{ fontSize: 16, color: '#1E90FF', textDecorationLine: 'underline' }}
                    >
                      {selectedStudent.mobileNumber}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#808080' }}>Email Address</Text>
                    <Text
                      style={{ fontSize: 16, color: '#1E90FF', textDecorationLine: 'underline' }}
                    >
                      {selectedStudent.email}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text>Loading student details...</Text>
            )}
            {selectedStudent
              ? selectedStudent.parentDetails.length > 0 && (
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: Colors.black,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      Guardian Information
                    </Text>
                    {selectedStudent ? (
                      selectedStudent.parentDetails.map((student, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              borderWidth: 0.7,
                              borderColor: '#D3D3D3',
                              padding: 20,
                              marginBottom: 20,
                              borderRadius: 8,
                            }}
                          >
                            <Image
                              source={localImages[student.guardianProfilePicture]}
                              style={{ height: 50, width: 50 }}
                            ></Image>
                            <Text
                              style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: Colors.black,
                                paddingTop: 5,
                              }}
                            >
                              {student.guardianName}
                            </Text>

                            <View
                              style={{
                                flexDirection: 'row',
                                paddingTop: 20,
                                justifyContent: 'space-between',
                              }}
                            >
                              <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, color: '#808080' }}>Mobile</Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: '#1E90FF',
                                    textDecorationLine: 'underline',
                                  }}
                                >
                                  {student.guardianMobile}
                                </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, color: '#808080' }}>
                                  Email Address
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: '#1E90FF',
                                    textDecorationLine: 'underline',
                                  }}
                                >
                                  {student.guardianEmail}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <Text style={{ color: Colors.black }}>Loading guardian details...</Text>
                    )}
                  </View>
                )
              : null}
          </BottomSheetScrollView>
        </BottomSheet>
        {isCreateSheetOpen && (
          <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={10} />
        )}
        <EditStudent
          editBottomSheetRef={editBottomSheetRef}
          editedStudent={editedStudent}
          setEditedStudent={setEditedStudent}
          showDatePicker={showDatePicker}
          onDateChange={onDateChange}
          handleDatePress={handleDatePress}
          handleSaveChanges={handleSaveChanges}
          hideEditBottomSheet={hideEditBottomSheet}
        ></EditStudent>

        <CreateStudent
          createBottomSheetRef={createBottomSheetRef}
          showDatePicker={showDatePicker}
          onDateChange={onDateChange}
          handleDatePress={handleDatePress}
          handleCreateStudent={handleCreateStudent}
          hideCreateBottomSheet={hideCreateBottomSheet}
        ></CreateStudent>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default StudentsList;
