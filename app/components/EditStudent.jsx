import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { localImages } from '../utils/imageMapping';

const EditStudent = ({
  editBottomSheetRef,
  hideEditBottomSheet,
  editedStudent,
  setEditedStudent,
  handleDatePress,
  showDatePicker,
  onDateChange,
  handleSaveChanges,
}) => {
  return (
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
            source={localImages[editedStudent?.profilePicture]}
            style={{ height: 100, width: 100 }}
          ></Image>
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
            value={editedStudent.name}
            onChangeText={(text) => setEditedStudent({ ...editedStudent, name: text })}
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
            value={editedStudent.mobileNumber}
            onChangeText={(text) => setEditedStudent({ ...editedStudent, mobileNumber: text })}
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
            value={editedStudent.email}
            onChangeText={(text) => setEditedStudent({ ...editedStudent, email: text })}
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

          {editedStudent
            ? editedStudent?.parentDetails?.length > 0 && (
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
              )
            : null}

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
  );
};
export default EditStudent;
