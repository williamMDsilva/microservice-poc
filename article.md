# [MICROSERVICES] Message Queues e REST – Uma Abordagem com Go, NodeJS e Clean Architecture

## 1. Um breve contexto

Nos últimos anos, a arquitetura de microserviços tem se tornado uma escolha popular para construir sistemas escaláveis, flexíveis e de fácil manutenção. Ao dividir uma aplicação em serviços menores e independentes, é possível manter, testar e subir cada serviço de forma autônoma, facilitando a escalabilidade e a inclusão de novas tecnologias.

Neste artigo, exploraremos a criação de uma arquitetura de microserviços utilizando Go e NodeJS, duas linguagens amplamente usadas e, neste contexto, com características complementares. Além disso, aplicaremos os princípios da Clean Architecture, uma abordagem de design que visa manter o código limpo, modular e fácil de manter, e testar, garantindo que a lógica de negócio esteja isolada das preocupações de infraestrutura e/ou dependências.

O objetivo deste projeto é praticar Go, uma linguagem que tenho estudado recentemente, e revisitar conceitos fundamentais de microserviços. Paralelamente, utilizaremos TypeScript no desenvolvimento dos serviços, aplicando os princípios da Clean Architecture para reforçar boas práticas de design de software.

A partir dessas premissas, teremos a oportunidade de explorar tanto os pontos positivos quanto os desafios dessa abordagem. Afinal, nem todo negócio exige uma estrutura tão complexa, e um projeto prático é a melhor forma de entender suas reais necessidades e implicações.

## 2. Tecnologias e Arquitetura Geral

### 2.1 Arquitetura de Microservices

A arquitetura de microservices divide uma aplicação em serviços menores e independentes, cada um responsável por uma parte específica da funcionalidade. Esses serviços se comunicam por meio de APIs bem definidas, o que facilita a manutenção, escalabilidade e adoção de novas tecnologias.

Benefícios:

Modularidade: Facilita a manutenção e o desenvolvimento independente de cada serviço.
Escalabilidade: Permite a escalabilidade individual de cada serviço conforme a demanda.
Resiliência: Isola falhas e reduz o impacto de problemas em um serviço sobre outros.
Comparação com Monolitos:

Monolitos: Aplicações integradas em uma unica code base. Embora simples inicialmente, podem se tornar difíceis de manter e escalar com o tempo.

Microservices: Oferecem maior flexibilidade e escalabilidade, mas podem criar um complexidade adicional na gestão e comunicação entre serviços.

### 2.2 Comunicação entre Microservices

Em uma arquitetura de microservices, a comunicação entre serviços pode ser feita de duas formas principais: comunicação assíncrona, usando message queues por exemplos e comunicação síncrona, através de APIs REST. Vale destacar que existem outra forma de comunição além de queue e rest.

#### 2.2.1 Message Queues (Comunicação Assíncrona)

As filas de mensagens são usadas para permitir a comunicação assíncrona entre microservices. Elas permitem que serviços enviem e recebam mensagens sem precisar de uma resposta imediata, o que ajuda a melhorar a resiliência e a escalabilidade do sistema.

Papel das Filas de Mensagens:

Comunicação Assíncrona: Facilita a troca de informações entre serviços sem necessidade de resposta instantânea.
Resiliência: Gerencia picos de carga e falhas temporárias, garantindo que mensagens sejam processadas eventualmente.

Implementação:

Ferramentas: RabbitMQ e Kafka são opções populares para gerenciar filas de mensagens.
Integração: Implementar filas de mensagens para comunicação entre serviços escritos em Go e NodeJS, garantindo uma troca de dados eficiente e escalável.

#### 2.2.2 APIs REST (Comunicação Síncrona)

APIs RESTful são usadas para comunicação síncrona entre serviços. Elas são baseadas em princípios HTTP e permitem que serviços interajam de maneira padronizada e eficiente.

### 2.3 Clean Architecture

Clean Architecture é uma abordagem de design que visa criar sistemas com um código base bem organizado e fácil de manter e/ou testar. Ela enfatiza a separação de preocupações e a independência de camadas.

Princípios da Clean Architecture:

Separação de Camadas: Dividir o código em camadas distintas (domínio, aplicação, infraestrutura) para isolar a lógica de negócio das preocupações técnicas.
Independência de Frameworks e Bibliotecas: Garantir que a lógica de negócio não seja dependente de frameworks ou tecnologias específicas.
Aplicação em Microservices:

Organização do Código: Estruturar cada microservice seguindo os princípios da Clean Architecture para garantir um código modular, testável e fácil de manter.
Manutenção e Evolução: Facilitar a adição de novas funcionalidades e a modificação de existentes sem comprometer a integridade do sistema.

## 3. O ecosistema do projeto

No ecossistema de microservices, um endpoint HTTP desempenha um papel crucial na orquestração do fluxo de trabalho dos documentos, neste context, é onde tudo começa. Este endpoint é responsável por receber e processar a solicitação para criar um novo documento. Ao receber uma requisição, ele enfileira o documento para o worker em Go, que se encarregará da geração e processamento do documento. Além disso, o endpoint emite uma notificação para o serviço de documentos por meio de uma Message Queue, informando que um novo recurso, ou seja, um documento, entrou na fila para processamento. Esta abordagem assegura uma integração eficiente entre os componentes do sistema, permitindo que o endpoint gerencie a criação e o rastreamento dos documentos de forma coordenada e assíncrona, enquanto o worker em Go cuida da criação efetiva dos documentos e o serviço de documentos é atualizado sobre novos itens na fila.

Além do endpoint HTTP, o sistema conta com dois workers com papéis distintos. O primeiro, implementado em Go, é responsável pela geração dos documentos. Ele consome tarefas de uma fila de mensagens, processa os dados e, ao concluir o processamento, notifica um endpoint específico sobre a conclusão. A eficiência do Go garante um processamento rápido e robusto. O segundo worker, desenvolvido em NodeJS, lida com a criação do estado inicial dos documentos, definindo-os como "não processado" ao serem inseridos no sistema. A agilidade do NodeJS permite uma gestão rápida e eficiente dos estados dos documentos desde o início do fluxo de trabalho.

Em resumo, o sistema descrito demonstra um fluxo bem coordenado para o gerenciamento de documentos. O endpoint HTTP, em conjunto com os workers em Go e NodeJS, proporciona uma solução integrada e eficiente, garantindo desde a criação até a conclusão do processamento dos documentos. A interação entre os workers e o REST, é refletida na imagem da arquitetura abaixo, que ilustra como a arquitetura promove escalabilidade e modularidade, assegurando um fluxo de trabalho robusto e coordenado. Esta abordagem não só melhora a eficiência operacional, mas também pode ser adaptada para diferentes cenários de uso, oferecendo flexibilidade e crescimento futuro.

O desenho final: <img src="./arch.png">

O repositorio do projeto: [https://github.com/williamMDsilva/microservice-poc](https://github.com/williamMDsilva/microservice-poc)

## 4. Desafios e Considerações Finais

### 4.1 Desafios na Implementação

Implementar uma arquitetura de microservices com a Clean Architecture pode apresentar diversos desafios. Um dos principais desafios é o entendimento profundo do negócio para criar um código que seja verdadeiramente escalável e mantenha a integridade da lógica de negócio. A Clean Architecture exige que o código seja estruturado de forma a separar claramente as preocupações, o que demanda um conhecimento detalhado do domínio para que as abstrações e separações sejam efetivas.

Além disso, o conhecimento dos princípios SOLID é crucial. Estes princípios ajudam a criar um código mais coeso e menos acoplado, e um entendimento sólido deles pode economizar tempo significativo na pesquisa e resolução de problemas. A aplicação dos princípios SOLID não apenas melhora a qualidade do código, mas também facilita a manutenção e a escalabilidade do sistema.

No caso específico do Go, uma base sólida na linguagem pode melhorar a legibilidade e a manutenção do código. Go oferece ferramentas e práticas que ajudam a manter o código limpo e eficiente, e um conhecimento mais profundo pode fazer a diferença na implementação de serviços complexos.

Por fim, o uso de um bom boilerplate pode ser extremamente benéfico. Boilerplates bem projetados para a Clean Architecture não apenas aceleram o início do desenvolvimento, mas também garantem que novos recursos sejam adicionados dentro do padrão proposto inicialmente. Eles oferecem uma estrutura que ajuda a manter a consistência e a qualidade do código ao longo do projeto.

### 4.2 Próximos Passos

Para avançar e melhorar a arquitetura descrita, alguns próximos passos são recomendados:

1. Incluir Recursos de Monitoramento e Observabilidade: Implementar ferramentas de monitoramento e observabilidade é essencial para garantir a saúde e o desempenho do sistema. A inclusão de métricas, logs e tracing ajuda a identificar problemas e a analisar o comportamento do sistema em produção.

1. Adicionar Tratativas para Indisponibilidade: É crucial incluir mecanismos para lidar com falhas e indisponibilidades, como retries, circuit breakers e fallback strategies, para aumentar a resiliência do sistema e garantir a continuidade dos serviços.

1. Realizar Testes Unitários e de Integração: Testes são fundamentais para garantir a qualidade do código e a integração correta dos componentes. Testes unitários verificam o funcionamento de partes isoladas do código, enquanto testes de integração asseguram que os diferentes componentes do sistema funcionam corretamente em conjunto.

1. Refatorar Serviços e Módulos: Revisar e refatorar serviços e módulos existentes para garantir que o código permaneça limpo, legível e alinhado com os princípios da Clean Architecture é uma tarefa contínua que melhora a manutenabilidade e a escalabilidade do sistema.

1. Prova de Conceito com Kafka: Considerar uma prova de conceito para substituir o RabbitMQ por Kafka pode oferecer uma visão sobre como diferentes ferramentas impactam o projeto. A análise do impacto no design do serviço e na arquitetura geral pode fornecer insights valiosos para futuras decisões tecnológicas.

### 4.3 Conclusão

Este projeto demonstrou a eficácia de uma arquitetura bem planejada e a importância de uma implementação cuidadosa dos princípios da Clean Architecture. O uso de Go e NodeJS, combinado com práticas como SOLID e o emprego de message queues e APIs REST, contribuiu para um sistema robusto e escalável. No entanto, o desenvolvimento e a manutenção de uma arquitetura de microservices apresentam desafios que exigem um conhecimento profundo do negócio e da tecnologia. Enfrentar esses desafios com um planejamento adequado e a adoção de boas práticas ajuda a garantir a construção de sistemas eficientes e sustentáveis. O caminho adiante envolve a incorporação de melhorias contínuas, como monitoramento avançado e novas provas de conceito, para manter a arquitetura alinhada com as necessidades e evolução do negócio.

5. Referências

Martin, R. C. (2008). Código Limpo: Habilidades Práticas do Agile Software. Alta Books.

Martin, R. C. (2017). Arquitetura Limpa: Estruturas e Princípios para o Design de Software. Alta Books.

RabbitMQ. (n.d.). Tutorial Two - JavaScript. Retrieved from https://www.rabbitmq.com/tutorials/tutorial-two-javascript

RabbitMQ. (n.d.). Tutorial Two - Go. Retrieved from https://www.rabbitmq.com/tutorials/tutorial-two-go

## Disclaimer

Devido à natureza acadêmica e de prova de conceito deste projeto, alguns recursos não foram implementados e permanecem como débitos técnicos para futuros estudos. Áreas como testes automatizados, tratamento de erros, stream de recursos, autenticação nos serviços e observabilidade são temas que ainda precisam ser explorados. Toda crítica construtiva é bem-vinda e encorajada, pois contribui para a melhoria contínua e o aprofundamento no conhecimento dessas áreas importantes.
