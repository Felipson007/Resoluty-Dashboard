# 🔥 Configuração do Firestore - Resoluty Dashboard

## ⚠️ Problema Identificado

O erro `Cloud Firestore API has not been used in project resolutydashboard before or it is disabled` indica que o Firestore precisa ser habilitado no Firebase Console.

## 🛠️ Solução Passo a Passo

### 1. **Acessar o Firebase Console**
- URL: https://console.firebase.google.com/project/resolutydashboard
- Faça login com sua conta Google

### 2. **Habilitar Firestore Database**
1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Create database"**
3. Escolha **"Start in test mode"** (temporariamente)
4. Selecione a região: **"us-east1 (South Carolina)"** ou **"us-central1 (Iowa)"**
5. Clique em **"Done"**

### 3. **Habilitar Authentication**
1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Get started"**
3. Vá para a aba **"Sign-in method"**
4. Clique em **"Email/Password"**
5. Habilite a opção **"Enable"**
6. Clique em **"Save"**

### 4. **Configurar Regras de Segurança**
1. Na seção Firestore, clique em **"Rules"**
2. Substitua as regras por:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler e escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Usuários autenticados podem ler dados de outros usuários (para listagens)
    match /users/{userId} {
      allow read: if request.auth != null;
    }
    
    // Regra padrão - negar acesso não autenticado
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. Clique em **"Publish"**

## 🚀 Deploy Completo

Após configurar o Firestore, execute:

```bash
# Deploy completo (hosting + firestore)
firebase deploy

# Ou apenas hosting se preferir
firebase deploy --only hosting
```

## 📊 O que você verá no Firebase Console

### **Firestore Database**
```
resolutydashboard (database)
└── users (collection)
    └── [user-id] (document)
        ├── uid: "user-id"
        ├── email: "user@example.com"
        ├── displayName: "Nome do Usuário"
        ├── role: "user"
        ├── department: "TI"
        ├── createdAt: timestamp
        ├── lastLogin: timestamp
        └── isActive: true
```

### **Authentication**
```
Users
├── user1@example.com
│   ├── UID: abc123...
│   ├── Email: user1@example.com
│   ├── Email verified: false
│   └── Created: 2024-01-01
```

## 🔧 Comandos Úteis

```bash
# Verificar status do projeto
firebase projects:list

# Ver configurações atuais
firebase use

# Deploy apenas das regras do Firestore
firebase deploy --only firestore:rules

# Deploy apenas dos índices do Firestore
firebase deploy --only firestore:indexes
```

## 🎯 Testando o Sistema

1. **Acesse**: https://resolutydashboard.web.app
2. **Crie** uma conta nova
3. **Faça** login
4. **Verifique** no Firebase Console:
   - Authentication > Users: usuário criado
   - Firestore > Data: perfil do usuário

## ⚡ GitHub Actions

Os workflows do GitHub Actions foram corrigidos e agora usam:
- `cd frontend && npm install --legacy-peer-deps` em vez de `npm cli`
- Node.js 20 (compatível com Firebase CLI v14+)
- Setup adequado do ambiente
- Navegação para o diretório correto (frontend)
- Configuração correta do entryPoint

## 🆘 Troubleshooting

### Erro: "API not enabled"
- Acesse: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=resolutydashboard
- Clique em "Enable"

### Erro: "Permission denied"
- Verifique se está logado no Firebase CLI: `firebase login`
- Verifique se o projeto está correto: `firebase use`

### Erro: "Rules compilation failed"
- Verifique a sintaxe das regras no Firebase Console
- Use o simulador de regras para testar

---

**✅ Após seguir estes passos, o sistema de autenticação estará funcionando completamente!**
