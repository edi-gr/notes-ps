import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import note from "../assets/note.png";
import { Flex } from "@chakra-ui/react";

export default function Homepage() {
  return (
    <Box padding={8}>
      <Flex justifyContent="space-between" alignItems="center" height="100vh">
        <Heading>Please Sign In/Sign up to access the site</Heading>
        <Image w={500} src={note} />
      </Flex>
    </Box>
  );
}
