import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Image } from "@gluestack-ui/themed";

import { renderDetail } from "../utils/generalUtils";

export default function PersonDetails({ personDetails }) {
  return (
    <Box width="100%" marginTop={20}>
      {personDetails.profilePic && (
        <Box alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={() => openLink(personDetails.linkedin)}>
            <Image
              source={{ uri: personDetails.profilePic }}
              alt={personDetails.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        </Box>
      )}

      {renderDetail({ iconName: "user" }, personDetails.name)}

      {renderDetail(
        { iconName: "envelope" },
        personDetails.email,
        `mailto:${personDetails.email}`
      )}

      {personDetails.status &&
        renderDetail({ iconName: "info-circle" }, personDetails.status)}

      {personDetails.github &&
        renderDetail(
          { iconName: "github" },
          personDetails.github,
          personDetails.github
        )}

      {personDetails.linkedin &&
        renderDetail(
          { iconName: "linkedin" },
          personDetails.linkedin,
          personDetails.linkedin
        )}

      {personDetails.twitter &&
        renderDetail(
          { iconName: "twitter" },
          personDetails.twitter,
          personDetails.twitter
        )}

      {personDetails.personalWebsite &&
        renderDetail(
          { iconName: "globe" },
          personDetails.personalWebsite,
          personDetails.personalWebsite
        )}

      {personDetails.company &&
        renderDetail({ iconName: "building" }, personDetails.company)}

      {personDetails.companyURL &&
        renderDetail(
          { iconName: "globe" },
          personDetails.companyURL,
          personDetails.companyURL
        )}
    </Box>
  );
}
