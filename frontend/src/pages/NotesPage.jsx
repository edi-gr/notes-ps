import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/Notespage/NoteCard/NoteCard";
import { createNotes, getNotes } from "../Redux/notes/note.actions";
import { BsPlusLg } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Search from "../components/Search";

export default function NotesPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  console.log(data);
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    dispatch(createNotes({ title, body, tag }));
    setTitle("");
    setBody("");
    setTag("");
    onClose();
  };

  return (
    <Box mt={14} padding={8}>
      <div className="flex justify-center mb-5">
        <Search handleSearchNote={setSearchTerm} />
      </div>
      <Grid
        gap={10}
        w={"90%"}
        margin={"auto"}
        marginTop={10}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          // "repeat(3, 1fr)",
        ]}
      >
        {notes
          ?.filter(
            (note) =>
              note.title.toLowerCase().includes(searchTerm) ||
              note.body.toLowerCase().includes(searchTerm) ||
              note.tag.toLowerCase().includes(searchTerm)
          )
          .map((el) => (
            <NoteCard {...el} />
          ))}
      </Grid>

      <>
        <IconButton
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
          }
          position={"fixed"}
          w={"80px"}
          h={"80px"}
          borderRadius={50}
          bg={"yellowgreen"}
          bottom={0}
          right={0}
          onClick={onOpen}
          margin={16}
          icon={<BsPlusLg />}
        ></IconButton>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={title}
                m
                placeholder="Please enter title"
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <Textarea
                mt={8}
                value={body}
                placeholder={"Please enter description"}
                onChange={(e) => setBody(e.target.value)}
              ></Textarea>
              <Textarea
                mt={8}
                value={tag}
                placeholder={"Please enter tag"}
                onChange={(e) => setTag(e.target.value)}
              ></Textarea>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={createNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}
