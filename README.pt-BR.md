npx http-server . -p8080
npm run dev

### Nome do Projeto
**TaskFlow GitOps Self-Healing Platform**

### Qual é a ideia principal do projeto?

É uma **plataforma interna de deploy** completa, inspirada em ferramentas usadas por empresas médias e grandes. 

O objetivo é permitir que desenvolvedores consigam entregar código em produção de forma **segura, controlada e automatizada**, sem depender manualmente do time de DevOps a todo momento.

### Objetivo do Projeto

Demonstrar na prática a solução de problemas reais que times de engenharia enfrentam no dia a dia:

- Deploys manuais e propensos a erros
- Ambientes inconsistentes
- Falta de visibilidade e rastreabilidade
- Dependência excessiva do time de DevOps
- Baixa confiabilidade em produção (downtime, incidentes difíceis de recuperar)

---

### Como o projeto funciona (Fluxo Completo)

**1. Desenvolvedor**
- Trabalha na aplicação **TaskFlow** (um gerenciador de tarefas interno)
- Faz commit e push no repositório da aplicação

**2. CI Pipeline (GitHub Actions)**
- Executa testes automatizados
- Realiza scan de segurança (Trivy)
- Faz build da imagem Docker
- Envia a imagem para o Docker Hub (ou Amazon ECR)

**3. Ambientes**
- **Dev** → Deploy automático após o build
- **Staging** → Exige aprovação do Senior
- **Production** → Exige aprovação do Senior

**4. GitOps + ArgoCD**
- O ArgoCD monitora o repositório GitOps e aplica as alterações automaticamente nos ambientes

**5. Deploy Progressivo**
- Utiliza **Argo Rollouts** com estratégia **Blue-Green**

**6. Observabilidade**
- Prometheus + Grafana + Alertmanager

**7. Self-Healing (principal diferencial)**
- Caso ocorra falha em produção, a plataforma realiza **rollback automático**
- Um Kubernetes Operator (Kopf) pode atuar ativamente para corrigir problemas (ex: reiniciar pods, escalar recursos, etc.)

**8. Dashboard de Aprovação**
- Interface web simples onde o Senior visualiza commits/PRs pendentes
- Ele aprova (ou rejeita) a promoção para Staging e Produção
- Após o deploy, é possível simular falhas para validar o self-healing

---

### Tecnologias Principais
- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS e JavaScript (Tailwind)
- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **GitOps**: ArgoCD
- **Deploy Avançado**: Argo Rollouts
- **Orquestração**: Kubernetes (EKS)
- **Observabilidade**: Prometheus + Grafana + Alertmanager
- **Self-Healing**: Kopf (Kubernetes Operator)
