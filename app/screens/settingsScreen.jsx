import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import NeumorphicContainer from "../components/neumorphicContaner";
import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import settingsData from "../constants/settingData.json"

const getIconName = (title) => {
  switch (title) {
    case "Account":
      return "person.circle.fill";
    case "Privacy and Security":
      return "lock";
    case "About":
      return "questionmark.circle.fill";
    case "Log Out":
      return "rectangle.portrait.and.arrow.forward";
    default:
      return "person.circle";
  }
};

const SettingsScreen = () => {
  return (
    <View style={styles.background}>
      {settingsData.map((setting, index) =>
      (
        <NeumorphicContainer
          key={setting.id}
          styling={{
            marginBottom: 20,
            width: "100%"
          }}
          component={(
            <View style={styles.settingsItem}>
              <View style={styles.firstRow}>

                <IconSymbol name={getIconName(setting.title)}
                  size={30}
                  color={"red"} />
                <Text style={styles.textStyle}>{setting.title}</Text>
              </View>


              <TouchableOpacity
              >
                <IconSymbol
                  name="arrowshape.forward.fill"
                  color={"red"} />
              </TouchableOpacity>
            </View>
          )}
        />
      )
      )}
    </View>
  )
};


const styles = StyleSheet.create({
  background: {
    backgroundColor: "#E0E0E0",
    padding: 20,
    flex: 1
  },
  settingsItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center"
  },
  firstRow: { display: "flex", flexDirection: "row", alignItems: "center" },
  textStyle: {
    paddingStart: 7
  }
})
export default SettingsScreen;
