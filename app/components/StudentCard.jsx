import React from 'react';
import { Image, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { localImages } from '../utils/imageMapping';
const StudentCard = ({ student }) => {
  return (
    <View
      style={{
        borderWidth: 0.7,
        borderColor: '#D3D3D3',
        marginBottom: 20,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={localImages[student.profilePicture]} style={{ height: 40, width: 40 }} />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: Colors.black,
              paddingLeft: 5,
              fontWeight: 'bold',
            }}
          >
            {student.name}
          </Text>
        </View>
        <Checkbox></Checkbox>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          paddingTop: 0,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#808080',
              paddingLeft: 5,
            }}
          >
            Registration Number
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.black,
              paddingLeft: 5,
              fontWeight: 'bold',
            }}
          >
            {student.registrationNumber}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#808080',
              paddingLeft: 5,
            }}
          >
            Age
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.black,
              paddingLeft: 5,
              fontWeight: 'bold',
            }}
          >
            {student.age}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#808080',
              paddingLeft: 5,
            }}
          >
            Classes
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.black,
              paddingLeft: 5,
              fontWeight: 'bold',
            }}
          >
            {student.class}
          </Text>
        </View>
      </View>

      {student.parentDetails.length > 0 && (
        <View style={{ padding: 20, paddingTop: 0 }}>
          <Text
            style={{
              fontSize: 16,
              color: '#808080',
              paddingLeft: 5,
            }}
          >
            Family Members
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {student.parentDetails.map((parent, index) => {
              return (
                <Image
                  key={index}
                  source={localImages[parent.guardianProfilePicture]}
                  style={{ height: 30, width: 30, margin: 2.5 }}
                />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default StudentCard;
