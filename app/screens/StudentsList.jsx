import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useRef, useState } from 'react';
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

  const bottomSheetRef = useRef(null);
  const editBottomSheetRef = useRef(null);

  const showBottomSheet = (student) => {
    setSelectedStudent(student);
    setIsSheetOpen(true);

    bottomSheetRef.current?.expand();
  };

  const filteredStudents = studentsData.filter((student) => {
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
    setEditedStudent(student);
    setIsEditSheetOpen(true);
    console.log(showDatePicker);
    editBottomSheetRef.current?.expand();
  };

  const hideEditBottomSheet = () => {
    editBottomSheetRef.current?.close();
    setIsEditSheetOpen(false);
  };

  const handleSaveChanges = () => {
    setSelectedStudent(editedStudent);
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
            {studentsData.map((student, index) => {
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
                size={24}
                color="#000"
                onPress={() => {
                  showEditBottomSheet(selectedStudent);
                }}
              />
              <MaterialCommunityIcons
                name="account-check-outline"
                size={24}
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
        {isEditSheetOpen && (
          <BottomSheet
            ref={editBottomSheetRef}
            index={-1}
            snapPoints={['70%', '90%', '90%']}
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
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: Colors.black,
                }}
              >
                Edit Student Details
              </Text>
              <MaterialCommunityIcons
                name={'close-circle-outline'}
                color={'red'}
                size={25}
                onPress={() => {
                  hideEditBottomSheet();
                }}
              ></MaterialCommunityIcons>
            </View>

            <BottomSheetScrollView>
              <View style={{ padding: 20 }}>
                <Image
                  source={localImages[editedStudent.profilePicture]}
                  style={{ height: 100, width: 100 }}
                ></Image>
                <Text
                  style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}
                >
                  Name
                </Text>

                <TextInput
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#D3D3D3',
                    margin: 10,
                    padding: 15,
                    fontSize: 16,
                    color: '#A3A3A3',
                    borderRadius: 8,
                  }}
                  placeholder="Name"
                  value={editedStudent.name}
                  onChangeText={(text) => setEditedStudent({ ...editedStudent, name: text })}
                />
                <Text
                  style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}
                >
                  Phone Number
                </Text>
                <TextInput
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#D3D3D3',
                    margin: 10,
                    padding: 15,
                    fontSize: 16,
                    color: '#A3A3A3',
                    borderRadius: 8,
                  }}
                  placeholder="Mobile Number"
                  value={editedStudent.mobileNumber}
                  onChangeText={(text) =>
                    setEditedStudent({ ...editedStudent, mobileNumber: text })
                  }
                />
                <Text
                  style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}
                >
                  Email Address
                </Text>
                <TextInput
                  style={{
                    borderWidth: 0.6,
                    borderColor: '#D3D3D3',
                    margin: 10,
                    padding: 15,
                    fontSize: 16,
                    color: '#A3A3A3',
                    borderRadius: 8,
                  }}
                  placeholder="Email Address"
                  value={editedStudent.email}
                  onChangeText={(text) => setEditedStudent({ ...editedStudent, email: text })}
                />
                <Text
                  style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}
                >
                  Date of Birth
                </Text>
                <TouchableOpacity
                  onPress={handleDatePress}
                  style={{
                    borderWidth: 0.6,
                    borderColor: '#D3D3D3',
                    margin: 10,
                    padding: 15,
                    fontSize: 16,
                    color: '#A3A3A3',
                    borderRadius: 8,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16, color: '#A3A3A3' }}>
                    {editedStudent.dateOfBirth || 'Select Date of Birth'}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(editedStudent.dateOfBirth)}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => onDateChange(event, selectedDate)}
                  />
                )}

                {editedStudent.parentDetails.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: Colors.black,
                        paddingTop: 20,
                        paddingBottom: 20,
                      }}
                    >
                      Guardians Details
                    </Text>
                    <>
                      {editedStudent.parentDetails.map((parent, index) => {
                        return (
                          <View key={index}>
                            <Image
                              source={localImages[parent.guardianProfilePicture]}
                              style={{ height: 100, width: 100 }}
                            ></Image>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Colors.black,
                                paddingTop: 20,
                                paddingLeft: 15,
                              }}
                            >
                              Name
                            </Text>

                            <TextInput
                              style={{
                                borderWidth: 0.5,
                                borderColor: '#D3D3D3',
                                margin: 10,
                                padding: 15,
                                fontSize: 16,
                                color: '#A3A3A3',
                                borderRadius: 8,
                              }}
                              placeholder="Name"
                              value={parent.guardianName}
                              onChangeText={(text) =>
                                setEditedStudent({ ...parent, guardianName: text })
                              }
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                color: Colors.black,
                                paddingTop: 20,
                                paddingLeft: 15,
                              }}
                            >
                              Phone Number
                            </Text>
                            <TextInput
                              style={{
                                borderWidth: 0.5,
                                borderColor: '#D3D3D3',
                                margin: 10,
                                padding: 15,
                                fontSize: 16,
                                color: '#A3A3A3',
                                borderRadius: 8,
                              }}
                              placeholder="Mobile Number"
                              value={parent.guardianMobile}
                              onChangeText={(text) =>
                                setEditedStudent({ ...parent, guardianMobile: text })
                              }
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                color: Colors.black,
                                paddingTop: 20,
                                paddingLeft: 15,
                              }}
                            >
                              Email Address
                            </Text>
                            <TextInput
                              style={{
                                borderWidth: 0.6,
                                borderColor: '#D3D3D3',
                                margin: 10,
                                padding: 15,
                                fontSize: 16,
                                color: '#A3A3A3',
                                borderRadius: 8,
                              }}
                              placeholder="Email Address"
                              value={parent.guardianEmail}
                              onChangeText={(text) =>
                                setEditedStudent({ ...parent, guardianEmail: text })
                              }
                            />
                          </View>
                        );
                      })}
                    </>
                  </>
                )}

                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                      flex: 1,
                      marginRight: 5,
                      borderWidth: 0.5,
                      borderColor: Colors.black,
                    }}
                    onPress={() => {
                      hideEditBottomSheet();
                    }}
                  >
                    <Text style={{ color: '#000', fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#000',
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                      flex: 1,
                      marginLeft: 5,
                    }}
                    onPress={handleSaveChanges}
                  >
                    <Text style={{ color: '#FFF', fontSize: 16 }}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default StudentsList;
