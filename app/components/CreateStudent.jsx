import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { localImages } from '../utils/imageMapping';

const CreateStudent = ({
  createBottomSheetRef,
  hideCreateBottomSheet,
  handleDatePress,
  showDatePicker,
  onDateChange,
  handleCreateStudent,
}) => {
  const [newStudent, setNewStudent] = useState({
    profilePicture: 'person1',
    name: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    age: '',
    class: '',
    parentDetails: [],
  });

  const addGuardian = () => {
    setNewStudent((prev) => ({
      ...prev,
      parentDetails: [
        ...prev.parentDetails,
        {
          guardianProfilePicture: 'person5',
          guardianName: '',
          guardianMobile: '',
          guardianEmail: '',
        },
      ],
    }));
  };

  const updateGuardian = (index, field, value) => {
    const updatedParents = [...newStudent.parentDetails];
    updatedParents[index][field] = value;
    setNewStudent({ ...newStudent, parentDetails: updatedParents });
  };

  return (
    <BottomSheet
      ref={createBottomSheetRef}
      index={-1}
      snapPoints={['70%', '90%', '90%']}
      enableDynamicSizing={false}
      handleIndicatorStyle={{ backgroundColor: Colors.white }}
      style={{ borderWidth: 1, borderColor: '#000', borderRadius: 40 }}
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
          Create New Student
        </Text>
        <MaterialCommunityIcons
          name={'close-circle-outline'}
          color={'red'}
          size={25}
          onPress={() => {
            hideCreateBottomSheet();
          }}
        />
      </View>

      <BottomSheetScrollView>
        <View style={{ padding: 20 }}>
          <Image
            source={localImages[newStudent.profilePicture]}
            style={{ height: 100, width: 100 }}
          />
          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
            placeholderTextColor={'#A3A3A3'}
            value={newStudent.name}
            onChangeText={(text) => setNewStudent({ ...newStudent, name: text })}
          />
          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
            placeholderTextColor={'#A3A3A3'}
            value={newStudent.mobileNumber}
            onChangeText={(text) => setNewStudent({ ...newStudent, mobileNumber: text })}
          />
          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
            placeholderTextColor={'#A3A3A3'}
            value={newStudent.email}
            onChangeText={(text) => setNewStudent({ ...newStudent, email: text })}
          />
          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
            Age
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
            placeholder="Age"
            placeholderTextColor={'#A3A3A3'}
            value={newStudent.age}
            onChangeText={(text) => setNewStudent({ ...newStudent, age: text })}
          />

          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
            Class
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
            placeholder="Class"
            placeholderTextColor={'#A3A3A3'}
            value={newStudent.class}
            onChangeText={(text) => setNewStudent({ ...newStudent, class: text })}
          />
          <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
              {newStudent.dateOfBirth || 'Select Date of Birth'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={newStudent.dateOfBirth ? new Date(newStudent.dateOfBirth) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onDateChange(event, selectedDate)}
            />
          )}

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.black,
              paddingTop: 20,
              paddingBottom: 10,
            }}
          >
            Guardians Details
          </Text>

          {newStudent.parentDetails.map((parent, index) => (
            <View key={index}>
              <Image
                source={localImages[parent.guardianProfilePicture]}
                style={{ height: 100, width: 100 }}
              />
              <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
                placeholder="Guardian Name"
                placeholderTextColor={'#A3A3A3'}
                value={parent.guardianName}
                onChangeText={(text) => updateGuardian(index, 'guardianName', text)}
              />
              <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
                placeholderTextColor={'#A3A3A3'}
                placeholder="Guardian Mobile Number"
                value={parent.guardianMobile}
                onChangeText={(text) => updateGuardian(index, 'guardianMobile', text)}
              />
              <Text style={{ fontSize: 16, color: Colors.black, paddingTop: 20, paddingLeft: 15 }}>
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
                placeholder="Guardian Email"
                placeholderTextColor={'#A3A3A3'}
                value={parent.guardianEmail}
                onChangeText={(text) => updateGuardian(index, 'guardianEmail', text)}
              />
            </View>
          ))}

          <TouchableOpacity
            style={{
              backgroundColor: '#f0f0f0',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              alignItems: 'center',
            }}
            onPress={addGuardian}
          >
            <Text style={{ fontSize: 16, color: '#000' }}>Add Guardian</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
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
              onPress={hideCreateBottomSheet}
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
              onPress={() => handleCreateStudent(newStudent)}
            >
              <Text style={{ color: '#FFF', fontSize: 16 }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CreateStudent;
