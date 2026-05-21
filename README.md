# SpaceX Launch Tracker — Desafio Técnico QA

> **Pontotel** · Case Técnico · Engenheiro(a) de QA

Parabéns por chegar até aqui! Este desafio avalia sua capacidade de garantir a qualidade de um sistema real, cobrindo automação de APIs, testes mobile e uso inteligente de IA.

---

## Sua missão

Imagine que a Pontotel está lançando um módulo que utiliza IA para prever o sucesso de lançamentos espaciais com base no histórico da SpaceX. Como QA responsável, você deve garantir que tanto a API quanto a interface mobile sejam confiáveis.

---

## As três superfícies que você vai testar

### 1. API SpaceX
API pública, gratuita, sem autenticação.
- Documentação: [docs.spacexdata.com](https://docs.spacexdata.com)
- Base URL: `https://api.spacexdata.com/v5`
- Endpoints relevantes: `/launches`, `/rockets`, `/launchpads`

### 2. Aplicação Web
App Vue.js que consome a API SpaceX. Hospedado e acessível para testes web.
- Repositório: [github.com/Lar21/vue-spacex-launchpad](https://github.com/Lar21/vue-spacex-launchpad)
- Clone e rode localmente (instruções no README do projeto)

### 3. App Mobile (este repositório)
React Native com Expo. É o app que você está olhando agora.

---

## Pré-requisitos

- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- Android: Android Studio + emulador configurado **OU** dispositivo físico com Expo Go
- iOS: Xcode + simulador **OU** dispositivo físico com Expo Go
- Python 3.10+ (recomendado para automação)

---

## Como rodar o app mobile

```bash
# 1. Instale as dependências
yarn install

# 2. Inicie o servidor Expo
yarn start

# 3. No terminal, pressione:
#    'a' para Android
#    'i' para iOS (macOS necessário)
```

### Variável de ambiente para testes

Crie um arquivo `.env` na raiz do projeto (copie o `.env.example`):

```bash
cp .env.example .env
```

Para simular falha de rede e testar o **error state** sem precisar do modo avião:

```bash
# .env
EXPO_PUBLIC_FORCE_ERROR=true
```

Reinicie o servidor após alterar o `.env`.

---
