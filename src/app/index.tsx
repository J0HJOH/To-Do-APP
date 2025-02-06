import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link
        href="/signup"
        asChild
      >
        <Button
          title="Go to SignUp"
        />
      </Link>

      <Link
        href="/login"
        asChild
      >
        <Button
          title="Go to Login"
        />
      </Link>
    </View>
  );
}
