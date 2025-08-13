// Import React Native core components for building the UI
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// Import React hooks - useState allows us to manage component state
// useState is a React Hook that lets you add state variables to your functional components.
// It returns an array with two elements: the current state value and a function to update it.
// For example: const [value, setValue] = useState(initialValue);
import { useState } from 'react';

// Import React Navigation components for screen navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Create a stack navigator instance for managing screen navigation
const Stack = createNativeStackNavigator();

// Define the type structure for our navigation stack
// This tells TypeScript what parameters each screen expects
type RootStackParamList = {
  Home: undefined;  // Home screen doesn't need any parameters
  ViewDetails: { name: string; surname: string };  // ViewDetails screen expects name and surname parameters
};

// Define the navigation prop type for the MainScreen component
// This ensures type safety when using navigation functions
type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Define the props interface for MainScreen component
// This ensures the component receives the correct navigation prop
interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

// Main App component - this is the root component that gets rendered
export default function App() 
{
   // Return the navigation container with our stack navigator
   // NavigationContainer wraps the entire app and manages navigation state
   return( 
    <NavigationContainer> 
      <Stack.Navigator> 
        {/* Define our screens - Home is the initial screen */}
        <Stack.Screen name="Home" component={MainScreen} /> 
        {/* ViewDetails screen for displaying user information */}
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
      </Stack.Navigator> 
    </NavigationContainer> 
  );
}

// ViewDetails component - displays the user's entered name and surname
// Receives route parameter containing the navigation data
function ViewDetails({ route }: { route: any }) { 
  // Extract name and surname from the route parameters
  const { name, surname } = route.params;
  
  // Return a centered view with the user's information
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
      <Text>Name: {name} Surname: {surname}</Text> 
    </View> 
  ); 
}; 

// MainScreen component - the home screen where users enter their information
// Receives navigation prop to enable screen navigation
function MainScreen ({ navigation }: MainScreenProps){
  // State variable to store the user's first name
  // setName is the function to update the name value
  // useState('') initializes the state with an empty string
  const [Name, setName] = useState(''); 

  // State variable to store the user's surname/last name
  // setSurname is the function to update the surname value
  // useState('') initializes the state with an empty string
  const [Surname, setSurname] = useState(''); 
  
  // Log message when the component starts up (for debugging)
  console.log("App starting up"); 
  
  // Return the main screen UI
  return (
      <View style={styles.container}>
        {/* Container for the main image */}
        <View style={styles.mainPicture}> 
          {/* Display the main app image */}
          <Image style={styles.ImageSize} source={require('./assets/download.png')} /> 
        </View> 
      
        {/* Welcome text displayed at the top */}
        <Text style={styles.welcomeText}>My first react native app</Text>
        
        {/* Container for the name input field */}
        <View style={styles.InputFlex}> 
          {/* Label for the name input */}
          <Text style={styles.HeadingText}>Enter Name:</Text> 
          {/* Text input for entering the first name */}
          <TextInput 
            style={styles.InputBoxs} 
            placeholder="First Name" 
            onChangeText={newText => setName(newText)}  // Update name state when text changes
            autoCapitalize="words"  // Automatically capitalize first letter of each word
            autoComplete="given-name"  // Enable autocomplete for first names
            autoCorrect={false}  // Disable autocorrect
            keyboardType="default"  // Use default keyboard
          /> 
        </View>
        
        {/* Container for the surname input field */}
        <View style={styles.InputFlex}> 
          {/* Label for the surname input */}
          <Text style={styles.HeadingText}>Enter Surname:</Text> 
          {/* Text input for entering the surname */}
          <TextInput 
            style={styles.InputBoxs} 
            placeholder="Surname" 
            onChangeText={newText => setSurname(newText)}  // Update surname state when text changes
            autoCapitalize="words"  // Automatically capitalize first letter of each word
            autoComplete="family-name"  // Enable autocomplete for family names
            autoCorrect={false}  // Disable autocorrect
            keyboardType="default"  // Use default keyboard
          /> 
        </View>
        
        {/* Status bar component for managing device status bar */}
        <StatusBar style="auto" />
        
        {/* Button to submit user information and navigate to details screen */}
        <Button 
          title="Add user" 
          onPress={() => {
            // Log the entered information to console for debugging
            console.log("Name: " + Name +  " Surname: " + Surname);
            // Navigate to ViewDetails screen and pass the name and surname as parameters
            navigation.navigate('ViewDetails', { name: Name, surname: Surname });
          }}
        />
      </View>
  );
}

// Comment indicating the start of styles section
//hello

// StyleSheet object containing all the styling for our components
const styles = StyleSheet.create({
  // Main container style - centers content and takes full screen
  container: {
    flex: 1,  // Take up all available space
    backgroundColor: '#fff',  // White background
    alignItems: 'center',  // Center content horizontally
    justifyContent: 'center',  // Center content vertically
  },
  
  // Style for the welcome text at the top
  welcomeText:{
    paddingTop: 40,  // Add top padding for spacing
    color: 'purple',  // Purple text color
    fontWeight: 'bold',  // Bold font weight
    fontSize: 28,  // Large font size
    textAlign: 'center'  // Center align the text
  },
  
  // Style for input field labels (Enter Name:, Enter Surname:)
  HeadingText:{
    paddingTop: 40,  // Add top padding for spacing
    fontWeight: 'bold',  // Bold font weight
    fontSize: 15,  // Medium font size
    textAlign: 'left'  // Left align the text
  },
  
  // Container style for input fields - arranges label and input horizontally
  InputFlex:{
    flexDirection: 'row',  // Arrange children in a row (horizontally)
    marginTop: 30,  // Add top margin for spacing
    justifyContent: 'space-evenly',  // Distribute space evenly between children
  },
  
  // Style for the text input boxes
  InputBoxs:{
    borderBottomWidth: 1,  // Add bottom border with 1px width
    borderBottomColor: '#000',  // Black bottom border color
    marginTop: 20,  // Add top margin for spacing
    marginLeft: 10,  // Add left margin for spacing
    flex: 1  // Take up remaining space in the flex container
  },
  
  // Container style for the main image
  mainPicture:{ 
    paddingTop: 40,  // Add top padding for spacing
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center'  // Center content horizontally
  }, 
  
  // Style for the main image dimensions
  ImageSize:{ 
    width: 350,  // Set image width to 350 pixels
    height: 350  // Set image height to 350 pixels
  }, 
});
//HELLO

//Add change the main screen to ask the user for their name and password 
//Make sure that they need to confirm their password
//in the view details view ask the user for their name and age 
//create a new screen to display the following message to the user "Hello (name) you were born in (year)"