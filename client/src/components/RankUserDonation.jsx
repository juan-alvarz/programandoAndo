import React from "react";
import oro from "../utils/images/oro.png";
import plata from "../utils/images/plata.png";
import bronce from "../utils/images/bronce.png";
import { useState } from "react";
import { Paginated} from "./Paginated";
import NavBar from "./NavBar"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import { useEffect } from "react";
let usuariosPrueba = [
  {
    language: "english",
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    ownPath: [],
    favorites: [],
    status: "pending",
    _id: "6318e5dbcc4b37d9076d0eda",
    name: "Agustin Figueredo",
    username: "figueredoagustin6692",
    email: "figueredoagustin6692@gmail.com",
    schools: [],
    role: "user",
    contributor: 150,
    banned: false,
    deleted: false,
    createdAt: "2022-09-07T18:41:31.624Z",
    updatedAt: "2022-09-07T18:41:31.624Z",
  },
  {
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    _id: "631a907e8685cf1046907719",
    name: "Franco Giuliano",
    username: "francosebastiangiuliano",
    email: "francosebastiangiuliano@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    ownPath: [],
    favorites: [],
    contributor: 340,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jb3NlYmFzdGlhbmdpdWxpYW5vQGdtYWlsLmNvbSIsImlhdCI6MTY2MjY4NTMxMH0.EAT0aT3D-763yp2_rl4MEric41CprU87JhDA06ukHDk",
    deleted: false,
    createdAt: "2022-09-09T01:01:50.492Z",
    updatedAt: "2022-09-12T17:54:38.830Z",
  },
  {
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    _id: "631b793e3810761965816523",
    name: "Daniel Felipe Martínez Cubillos",
    username: "daniespartan116",
    email: "daniespartan116@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    ownPath: [],
    favorites: [],
    contributor: 120,
    banned: false,
    status: "pending",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllc3BhcnRhbjExNkBnbWFpbC5jb20iLCJpYXQiOjE2NjI3NDQ4OTR9.sPmjkPUVVqW4DOcF217G_N6H-ql56y7sGmIrMGua1qg",
    deleted: false,
    createdAt: "2022-09-09T17:34:54.925Z",
    updatedAt: "2022-09-09T17:34:54.925Z",
  },
  {
    _id: "631be38a5da970e706cfae2b",
    name: "Luis Blanco",
    username: "luiswblanco",
    email: "luiswblanco@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "Venezuela",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 90,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXN3YmxhbmNvQGdtYWlsLmNvbSIsImlhdCI6MTY2Mjc3MjEwNn0.WWtcYLsheI6EU9BsKaPGFCqBWi-99JTaPIcy3y3FJRs",
    deleted: false,
    createdAt: "2022-09-10T01:08:26.726Z",
    updatedAt: "2022-09-12T04:46:14.902Z",
  },
  {
    _id: "631be6ea5da970e706cfae73",
    name: "Luis Blanco",
    username: "luchoapifree",
    email: "luchoapifree@gmail.com",
    schools: [],
    role: "admin",
    language: "spanish",
    country: "Burundi",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 15,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2hvYXBpZnJlZUBnbWFpbC5jb20iLCJpYXQiOjE2NjI3NzI5NzB9.o1kIQw_7pJPDZ-3-4uKrf8o_UJG4ainPgSlNi2KE8eI",
    deleted: false,
    createdAt: "2022-09-10T01:22:50.619Z",
    updatedAt: "2022-09-10T22:41:18.467Z",
  },
  {
    _id: "631c9d5aed1ba6a772d15a9e",
    name: "Juan Alvarez",
    username: "juan-alvarz",
    email: "ja0031471@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-10T14:08:09.207Z",
    ownPath: [],
    favorites: ["63110f06a465f77f6f1c7d5a"],
    contributor: 1006,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphMDAzMTQ3MUBnbWFpbC5jb20iLCJpYXQiOjE2NjI4MTk2NzR9.uiHThLsVIRNes4hkU3js4m7JGZeTYHQzLCyn0FyTT9k",
    deleted: false,
    createdAt: "2022-09-10T14:21:14.096Z",
    updatedAt: "2022-09-13T17:26:08.901Z",
  },
  {
    _id: "631e746e357107a9f4cd072b",
    name: "Rogelio Daniel Sandoval Vasquez",
    username: "danzsv94",
    email: "danzsv94@outlook.es",
    schools: [],
    role: "user",
    language: "english",
    country: "Peru",
    birthday: "2022-09-11T23:28:54.490Z",
    ownPath: [],
    favorites: [
      "631108b0bf394e803a3a9129",
      "63110dc73c5016947e296ef5",
      "63110f06a465f77f6f1c7d5a",
      "63110ffb53144f9472321daf",
      "6311138053144f9472321db9",
      "6311173653144f9472321dc5",
    ],
    contributor: 2500,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QG91dGxvb2suZXMiLCJpYXQiOjE2NjI5NDAyNzB9.CpYQzjSdzFPYkkf6iWq3OLr5sIDHGxR6gfL3_jY5VhE",
    deleted: false,
    createdAt: "2022-09-11T23:51:10.689Z",
    updatedAt: "2022-09-13T15:34:43.505Z",
  },
  {
    _id: "631f733499ce1e33dded7f75",
    name: "Rogelio Sandoval",
    username: "danzsv94",
    email: "danzsv94@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-12T16:19:18.315Z",
    ownPath: [],
    favorites: [],
    contributor: 500,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzAwNTQ5Mn0.8lTVpw1BPQohTLTH1Z_pz4Caze_dEGZpzQn5yJdwRWY",
    deleted: false,
    createdAt: "2022-09-12T17:58:12.380Z",
    updatedAt: "2022-09-12T17:58:40.305Z",
  },
  {
    _id: "6320d1c4f94e4743065b174f",
    name: "Dsxie Infinity",
    username: "team.dsxie",
    email: "team.dsxie@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-13T16:55:45.097Z",
    ownPath: [],
    favorites: [],
    contributor: 3200,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYW0uZHN4aWVAZ21haWwuY29tIiwiaWF0IjoxNjYzMDk1MjM2fQ.9xBQ8MBKvXtwaI3H6dpCI5MiYnX-xgeNrL6wcWzG_aA",
    deleted: false,
    createdAt: "2022-09-13T18:53:56.552Z",
    updatedAt: "2022-09-13T18:54:51.577Z",
  },
  {
    language: "english",
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    ownPath: [],
    favorites: [],
    status: "pending",
    _id: "6318e5dbcc4b37d9076d0eda",
    name: "Agustin Figueredo",
    username: "figueredoagustin6692",
    email: "figueredoagustin6692@gmail.com",
    schools: [],
    role: "user",
    contributor: 150,
    banned: false,
    deleted: false,
    createdAt: "2022-09-07T18:41:31.624Z",
    updatedAt: "2022-09-07T18:41:31.624Z",
  },
  {
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    _id: "631a907e8685cf1046907719",
    name: "Franco Giuliano",
    username: "francosebastiangiuliano",
    email: "francosebastiangiuliano@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    ownPath: [],
    favorites: [],
    contributor: 340,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyYW5jb3NlYmFzdGlhbmdpdWxpYW5vQGdtYWlsLmNvbSIsImlhdCI6MTY2MjY4NTMxMH0.EAT0aT3D-763yp2_rl4MEric41CprU87JhDA06ukHDk",
    deleted: false,
    createdAt: "2022-09-09T01:01:50.492Z",
    updatedAt: "2022-09-12T17:54:38.830Z",
  },
  {
    country: "",
    birthday: "2022-09-13T19:02:20.031Z",
    _id: "631b793e3810761965816523",
    name: "Daniel Felipe Martínez Cubillos",
    username: "daniespartan116",
    email: "daniespartan116@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    ownPath: [],
    favorites: [],
    contributor: 120,
    banned: false,
    status: "pending",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllc3BhcnRhbjExNkBnbWFpbC5jb20iLCJpYXQiOjE2NjI3NDQ4OTR9.sPmjkPUVVqW4DOcF217G_N6H-ql56y7sGmIrMGua1qg",
    deleted: false,
    createdAt: "2022-09-09T17:34:54.925Z",
    updatedAt: "2022-09-09T17:34:54.925Z",
  },
  {
    _id: "631be38a5da970e706cfae2b",
    name: "Luis Blanco",
    username: "luiswblanco",
    email: "luiswblanco@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "Venezuela",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 490,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXN3YmxhbmNvQGdtYWlsLmNvbSIsImlhdCI6MTY2Mjc3MjEwNn0.WWtcYLsheI6EU9BsKaPGFCqBWi-99JTaPIcy3y3FJRs",
    deleted: false,
    createdAt: "2022-09-10T01:08:26.726Z",
    updatedAt: "2022-09-12T04:46:14.902Z",
  },
  {
    _id: "631be6ea5da970e706cfae73",
    name: "Luis Blanco",
    username: "luchoapifree",
    email: "luchoapifree@gmail.com",
    schools: [],
    role: "admin",
    language: "spanish",
    country: "Burundi",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 215,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2hvYXBpZnJlZUBnbWFpbC5jb20iLCJpYXQiOjE2NjI3NzI5NzB9.o1kIQw_7pJPDZ-3-4uKrf8o_UJG4ainPgSlNi2KE8eI",
    deleted: false,
    createdAt: "2022-09-10T01:22:50.619Z",
    updatedAt: "2022-09-10T22:41:18.467Z",
  },
  {
    _id: "631c9d5aed1ba6a772d15a9e",
    name: "Juan Alvarez",
    username: "juan-alvarz",
    email: "ja0031471@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-10T14:08:09.207Z",
    ownPath: [],
    favorites: ["63110f06a465f77f6f1c7d5a"],
    contributor: 106,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphMDAzMTQ3MUBnbWFpbC5jb20iLCJpYXQiOjE2NjI4MTk2NzR9.uiHThLsVIRNes4hkU3js4m7JGZeTYHQzLCyn0FyTT9k",
    deleted: false,
    createdAt: "2022-09-10T14:21:14.096Z",
    updatedAt: "2022-09-13T17:26:08.901Z",
  },
  {
    _id: "631e746e357107a9f4cd072b",
    name: "Rogelio Daniel Sandoval Vasquez",
    username: "danzsv94",
    email: "danzsv94@outlook.es",
    schools: [],
    role: "user",
    language: "english",
    country: "Peru",
    birthday: "2022-09-11T23:28:54.490Z",
    ownPath: [],
    favorites: [
      "631108b0bf394e803a3a9129",
      "63110dc73c5016947e296ef5",
      "63110f06a465f77f6f1c7d5a",
      "63110ffb53144f9472321daf",
      "6311138053144f9472321db9",
      "6311173653144f9472321dc5",
    ],
    contributor: 500,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QG91dGxvb2suZXMiLCJpYXQiOjE2NjI5NDAyNzB9.CpYQzjSdzFPYkkf6iWq3OLr5sIDHGxR6gfL3_jY5VhE",
    deleted: false,
    createdAt: "2022-09-11T23:51:10.689Z",
    updatedAt: "2022-09-13T15:34:43.505Z",
  },
  {
    _id: "631f733499ce1e33dded7f75",
    name: "Rogelio Sandoval",
    username: "danzsv94",
    email: "danzsv94@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-12T16:19:18.315Z",
    ownPath: [],
    favorites: [],
    contributor: 50,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzAwNTQ5Mn0.8lTVpw1BPQohTLTH1Z_pz4Caze_dEGZpzQn5yJdwRWY",
    deleted: false,
    createdAt: "2022-09-12T17:58:12.380Z",
    updatedAt: "2022-09-12T17:58:40.305Z",
  },
  {
    _id: "6320d1c4f94e4743065b174f",
    name: "Dsxie Infinity",
    username: "team.dsxie",
    email: "team.dsxie@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-13T16:55:45.097Z",
    ownPath: [],
    favorites: [],
    contributor: 32,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYW0uZHN4aWVAZ21haWwuY29tIiwiaWF0IjoxNjYzMDk1MjM2fQ.9xBQ8MBKvXtwaI3H6dpCI5MiYnX-xgeNrL6wcWzG_aA",
    deleted: false,
    createdAt: "2022-09-13T18:53:56.552Z",
    updatedAt: "2022-09-13T18:54:51.577Z",
  },
  {
    _id: "631be38a5da970e706cfae2b",
    name: "Luis Blanco",
    username: "luiswblanco",
    email: "luiswblanco@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "Venezuela",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 49,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXN3YmxhbmNvQGdtYWlsLmNvbSIsImlhdCI6MTY2Mjc3MjEwNn0.WWtcYLsheI6EU9BsKaPGFCqBWi-99JTaPIcy3y3FJRs",
    deleted: false,
    createdAt: "2022-09-10T01:08:26.726Z",
    updatedAt: "2022-09-12T04:46:14.902Z",
  },
  {
    _id: "631be6ea5da970e706cfae73",
    name: "Luis Blanco",
    username: "luchoapifree",
    email: "luchoapifree@gmail.com",
    schools: [],
    role: "admin",
    language: "spanish",
    country: "Burundi",
    birthday: "2022-09-09T22:59:19.300Z",
    ownPath: [],
    favorites: [],
    contributor: 2150,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2hvYXBpZnJlZUBnbWFpbC5jb20iLCJpYXQiOjE2NjI3NzI5NzB9.o1kIQw_7pJPDZ-3-4uKrf8o_UJG4ainPgSlNi2KE8eI",
    deleted: false,
    createdAt: "2022-09-10T01:22:50.619Z",
    updatedAt: "2022-09-10T22:41:18.467Z",
  },
  {
    _id: "631c9d5aed1ba6a772d15a9e",
    name: "Juan Alvarez",
    username: "juan-alvarz",
    email: "ja0031471@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-10T14:08:09.207Z",
    ownPath: [],
    favorites: ["63110f06a465f77f6f1c7d5a"],
    contributor: 16,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphMDAzMTQ3MUBnbWFpbC5jb20iLCJpYXQiOjE2NjI4MTk2NzR9.uiHThLsVIRNes4hkU3js4m7JGZeTYHQzLCyn0FyTT9k",
    deleted: false,
    createdAt: "2022-09-10T14:21:14.096Z",
    updatedAt: "2022-09-13T17:26:08.901Z",
  },
  {
    _id: "631e746e357107a9f4cd072b",
    name: "Rogelio Daniel Sandoval Vasquez",
    username: "danzsv94",
    email: "danzsv94@outlook.es",
    schools: [],
    role: "user",
    language: "english",
    country: "Peru",
    birthday: "2022-09-11T23:28:54.490Z",
    ownPath: [],
    favorites: [
      "631108b0bf394e803a3a9129",
      "63110dc73c5016947e296ef5",
      "63110f06a465f77f6f1c7d5a",
      "63110ffb53144f9472321daf",
      "6311138053144f9472321db9",
      "6311173653144f9472321dc5",
    ],
    contributor: 5,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QG91dGxvb2suZXMiLCJpYXQiOjE2NjI5NDAyNzB9.CpYQzjSdzFPYkkf6iWq3OLr5sIDHGxR6gfL3_jY5VhE",
    deleted: false,
    createdAt: "2022-09-11T23:51:10.689Z",
    updatedAt: "2022-09-13T15:34:43.505Z",
  },
  {
    _id: "631f733499ce1e33dded7f75",
    name: "Rogelio Sandoval",
    username: "danzsv94",
    email: "danzsv94@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-12T16:19:18.315Z",
    ownPath: [],
    favorites: [],
    contributor: 250,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbnpzdjk0QGdtYWlsLmNvbSIsImlhdCI6MTY2MzAwNTQ5Mn0.8lTVpw1BPQohTLTH1Z_pz4Caze_dEGZpzQn5yJdwRWY",
    deleted: false,
    createdAt: "2022-09-12T17:58:12.380Z",
    updatedAt: "2022-09-12T17:58:40.305Z",
  },
  {
    _id: "6320d1c4f94e4743065b174f",
    name: "Dsxie Infinity",
    username: "team.dsxie",
    email: "team.dsxie@gmail.com",
    schools: [],
    role: "user",
    language: "english",
    country: "",
    birthday: "2022-09-13T16:55:45.097Z",
    ownPath: [],
    favorites: [],
    contributor: 22,
    banned: false,
    status: "active",
    confirmationCode:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYW0uZHN4aWVAZ21haWwuY29tIiwiaWF0IjoxNjYzMDk1MjM2fQ.9xBQ8MBKvXtwaI3H6dpCI5MiYnX-xgeNrL6wcWzG_aA",
    deleted: false,
    createdAt: "2022-09-13T18:53:56.552Z",
    updatedAt: "2022-09-13T18:54:51.577Z",
  },
];

const RankUserDonation = () => {
  
  
  const dispatch = useDispatch();
  
  const { users } = useSelector((state) => state.programandoando);
  useEffect(() => {
    dispatch(getUsers());
    
  }, [dispatch]);
  let rankingDB = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].contributor > 0) {
      rankingDB.push(users[i]);
    }
  }
  rankingDB.sort((a, b) => b.contributor - a.contributor);

 









  let ranking = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].contributor > 0) {
      ranking.push(users[i]);
    }
  }
  ranking.sort((a, b) => b.contributor - a.contributor);

  //PAGINADO
  const [paginaActual, setPaginaActual] = useState(1);
  const [usersPagina] = useState(6);

  const ultimoVideo = paginaActual * usersPagina;
  const primerVideo = ultimoVideo - usersPagina;

  const usersActuales = ranking.slice(primerVideo, ultimoVideo);

  const prev = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const next = () => {
    if (paginaActual < Math.ceil(ranking.length / usersPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <NavBar></NavBar>
      <h2
        className="text-center font-bold text-4xl my-5 uppercase"
        style={{ color: "#376D6D" }}
      >
        User Ranking
      </h2>
      <div className="flex justify-center mb-3">
        <Paginated
          setPagina={paginado}
          videos={ranking.length}
          videosPagina={usersPagina}
          paginaActual={paginaActual}
          prev={prev}
          next={next}
        ></Paginated>
      </div>
      <div className="grid grid-col-1 justify-center">
        {usersActuales ? (
          usersActuales.map((elemento, index) => {
            return (
              <div
                key={index}
                className="m-3 p-3 rounded-md shadow-lg  "
                style={{
                  backgroundColor: "rgb(17, 52, 82)",
                  width: "23rem",
                }}
              >
                <ul className="w-96 flex flex-col justify-center pr-8">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium text-gray-900 truncate "
                          style={{ color: "rgb(201, 196, 184)", fontSize: 19 }}
                        >
                          {elemento.name}
                        </p>
                        <p
                          className="text-sm text-gray-500 truncate dark:text-gray-400"
                          style={{ color: "rgb(201, 196, 184)" }}
                        >
                          {elemento.username}
                        </p>
                      </div>
                      <div
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                        style={{ color: "rgb(201, 196, 184)" }}
                      >
                        <img
                          src={index === 0 && paginaActual === 1 ? oro : ""}
                          className="pr-0.5"
                        ></img>
                        <img
                          src={index === 1 && paginaActual === 1 ? plata : ""}
                          className="pr-0.5"
                        ></img>
                        <img
                          src={index === 2 && paginaActual === 1 ? bronce : ""}
                          className="pr-0.5"
                        ></img>
                        {elemento.contributor}
                      </div>
                      <div className="pr-1">
                        <NavLink to="/userrank" state={elemento}>
                          <button
                            type="button"
                            className="my-3 p-3 text-white font-bold rounded-lg text-sm px-0.5 py-1.5 mr-2 mb-2"
                            style={{
                              width: "100%",
                              backgroundColor: "#376D6D",
                            }}
                          >
                            More Detail
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <span>No hay usuarios</span>
        )}
      </div>
    </div>
  );
};

export default RankUserDonation;
