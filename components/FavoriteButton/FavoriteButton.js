import React from 'react';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { db, app } from '../../firebase';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

function FavoriteButton({ favorites, getUserFavorites, listingID }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToFavorites = (listingID) => {
    const userID = currentUser.uid;
    var docRef = db.doc(`users/${userID}`);

    docRef.update({
      favoriteListings: firebase.firestore.FieldValue.arrayUnion(
        `${listingID}`
      ),
    });
  };

  // This one is more complicated at first glance!
  // How to remove a favorite
  const removeFromFavorites = (listingID) => {
    if (currentUser) {
      const userID = currentUser.uid;
      var docRef = db.doc(`users/${userID}`);

      docRef.update({
        favoriteListings: firebase.firestore.FieldValue.arrayRemove(
          `${listingID}`
        ),
      });
    }
  };

  /* To sum up the removeFromFavorites, we first have to surgically go into the existing favorites, find the one that needs removing, make a firebase ref for it, then pull it out with the .remove() method. This is the firebasey way of removing data. */
  if (favorites) {
    return favorites.filter((favorite) => favorite === listingID).length > 0 ? (
      <Box
        as="button"
        type="button"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          removeFromFavorites(listingID);
          getUserFavorites();
        }}
      >
        <Icon as={FaHeart} color="teal.500" w={6} h={6} />
      </Box>
    ) : (
      <>
        <Box
          as="button"
          variant="ghost"
          onClick={(e) => {
            if (!currentUser) {
              e.stopPropagation();
              onOpen();
            } else {
              e.stopPropagation();
              addToFavorites(listingID);
              getUserFavorites();
            }
          }}
        >
          <Icon as={FaRegHeart} color="teal.500" w={6} h={6} />
        </Box>
        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader mx="auto">Login / Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign="center">
              {' '}
              Login or create a new account to save your favorite listings
            </ModalBody>
            <ModalFooter mx="auto">
              <Button
                as="a"
                href="/account/login"
                variant="ghost"
                color="teal.500"
                mr={3}
                onClick={onClose}
              >
                Log in
              </Button>
              <Button
                as="a"
                href="/account/signup"
                variant="ghost"
                color="teal.500"
              >
                Sign up
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return null;
  }
}

export default FavoriteButton;
