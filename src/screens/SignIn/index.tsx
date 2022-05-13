import React, { useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreatedUserAccont() {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso!'))
    .catch(error => {
      // Mostra o código do erro
      console.log(error.code);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Este e-mail já está sendo usado. Escolha outro e-mail para cadastrar!')
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('E-mail inválido!')
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Senha deve ter no mínimo 6 dígitos.')
      }
    })
  }

  function handleSignInWithEmailAndPassword() {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => console.log(user))
    .catch(error => {
      console.log(error.code)
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert("Usuário não encontrado. E-mail ou senha inválida!")
      } 
    })
  }

  function handleForgotPassword() {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link no seu e-mail para redefinir sua senha!'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista para te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input 
        placeholder="senha" 
        secureTextEntry 
        onChangeText={setPassword} 
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreatedUserAccont} />
      </Account>
    </Container>
  );
}
