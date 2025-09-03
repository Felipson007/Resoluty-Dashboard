# 🔐 Configuração do Authentication - Resoluty Dashboard

## ⚠️ Erro Identificado

O erro `400 (Bad Request)` na URL `identitytoolkit.googleapis.com/v1/accounts:signUp` indica que o Authentication não está habilitado no Firebase Console.

## 🛠️ Solução Rápida

### 1. **Acessar o Firebase Console**
- URL: https://console.firebase.google.com/project/resolutydashboard
- Faça login com sua conta Google

### 2. **Habilitar Authentication**
1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Get started"**
3. Vá para a aba **"Sign-in method"**
4. Clique em **"Email/Password"**
5. Habilite a opção **"Enable"**
6. Clique em **"Save"**

### 3. **Configurar Domínios Autorizados**
1. Na seção Authentication, clique em **"Settings"**
2. Vá para a aba **"Authorized domains"**
3. Adicione: `resolutydashboard.web.app`
4. Clique em **"Save"**

### 4. **Verificar se está funcionando**
- Após habilitar, você deve ver "Email/Password" como "Enabled"
- O domínio `resolutydashboard.web.app` deve aparecer na lista de domínios autorizados

## 🎯 Teste Rápido

Após configurar:
1. **Acesse**: https://resolutydashboard.web.app
2. **Crie** uma conta nova (use um email diferente)
3. **Faça** login
4. **Verifique** no Firebase Console > Authentication > Users

## 🔧 Comandos Úteis

```bash
# Verificar status do projeto
firebase projects:list

# Deploy apenas hosting
firebase deploy --only hosting

# Deploy completo (após habilitar Firestore)
firebase deploy
```

## 🆘 Troubleshooting

### Erro: "Email already in use"
- Use um email diferente para teste
- Ou delete o usuário no Firebase Console > Authentication > Users

### Erro: "400 Bad Request"
- Verifique se Authentication está habilitado
- Verifique se o domínio está autorizado

---

**✅ Após seguir estes passos, o sistema de autenticação estará funcionando!**
