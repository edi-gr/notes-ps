import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import "./style.css";
import notebg from "../../../assets/note_bg.png";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../Redux/notes/note.actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdTitle } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export default function NoteCard({ title, body, tag, user, _id }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);
  const [tempTag, setTag] = useState(tag);

  const updateNote = () => {
    dispatch(
      updateNotes(_id, { title: tempTitle, body: tempBody, tag: tempTag })
    );
    onClose();
  };

  const borderColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("green.100", "red.700");
  const bgBorderColor = useColorModeValue("teal.500", "red.900");

  return (
    <Box width={["100%", "90%", "60%"]} mx="auto">
      <Card bg="gray.75" border="2px" borderColor="gray.900">
        <CardBody>
          <VStack>
            <Box
              bg={bgColor}
              px={2}
              py={1}
              borderRadius="md"
              border="1px"
              borderColor={bgBorderColor}
              marginLeft="auto"
            >
              <Text>{tag}</Text>
            </Box>
            <Flex
              justifyContent="space-between"
              gap={{ base: 3, md: 2 }}
              alignItems="center"
              overflow="hidden"
            >
              <Box overflow="hidden">
                <Icon
                  as={MdTitle}
                  boxSize={{ base: "2.5em", md: "2em" }}
                  color="red.300"
                />
              </Box>
              <Heading fontSize={{ base: "4xl", md: "2xl" }} isTruncated>
                {title}
              </Heading>
            </Flex>
            <Divider mb={4} borderColor={borderColor} borderWidth="2px" />
            <Flex justify="space-between" align="center" mb={4}>
              <Box p={0.5}>
                <Text fontSize="xl">{body}</Text>
              </Box>
            </Flex>
            <Flex justify="flex-end"></Flex>
            <Divider mb={4} borderColor={borderColor} borderWidth="2px" />

            <Flex gap={10} p={2} justifyContent="space-between">
              {/* <Stack direction={["column"]} gap={2} width="100%"> */}
              <>
                <Button color="black" bg="#edf2f7" onClick={onOpen}>
                  <Icon
                    as={AiOutlineEdit}
                    boxSize="2em"
                    color="yellow.600"
                    _hover={{ color: "black" }}
                  />
                </Button>

                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Update Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Input
                        value={tempTitle}
                        m
                        placeholder="Please enter title"
                        onChange={(e) => setTitle(e.target.value)}
                      ></Input>
                      <Textarea
                        mt={8}
                        value={tempBody}
                        placeholder={"Please enter description"}
                        onChange={(e) => setBody(e.target.value)}
                      ></Textarea>
                      <Textarea
                        mt={8}
                        value={tempTag}
                        placeholder={"Please enter tag"}
                        onChange={(e) => setTag(e.target.value)}
                      ></Textarea>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={updateNote}>
                        Update
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              <Button
                color="black"
                bg="#edf2f7"
                onClick={() => {
                  dispatch(deleteNotes(_id));
                }}
              >
                <Icon
                  as={MdOutlineDelete}
                  boxSize="2em"
                  color="red.600"
                  _hover={{ color: "black" }}
                />
              </Button>
              {/* </Stack> */}
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
