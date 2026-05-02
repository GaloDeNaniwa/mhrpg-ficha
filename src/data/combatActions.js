export const COMBAT_ACTIVITIES_TEXT = "ATIVIDADES PADRÕES\n● Ação: Em cada um dos seus turnos, você pode usar uma ação. As ações comuns de todo jogador são: “Atacar”, “Ajuda”, “Disparada”, “Esconder”, “Esquivar”, “Preparar”, “Procurar” e “Usar um Objeto”. Além dessas, você poderá usar ações exclusivas garantidas pela sua Classe e outras escolhas de criação do seu personagem. Também é possível improvisar ações, desde que sejam aprovadas pelo Narrador.\n● Deslocamento: Durante cada um dos seus turnos, você pode se mover por uma distância menor ou igual ao seu deslocamento máximo.\n● Ação Tática: Em cada um dos seus turnos, você pode usar uma ação tática. Uma atividade que possibilita executar Técnicas do seu Quirk, que, por padrão, só podem ser executadas dessa forma. Estratagemas são exceção a essa regra. Geralmente, tendo o requisito de uma ação bônus ou reação.\n\nATIVIDADES RESTRITAS\n● Reação: Você pode usar uma vez durante cada rodada, mas apenas se você possuir algum Traço ou Estratagema que tenha a reação como requisito.\n● Ação Bônus: Você pode usar uma vez durante seu turno, mas apenas se você possuir algum Traço ou Estratagema que tenha a ação bônus como requisito.";
export const COMBAT_ACTIONS = [
  {
    "id": "ajuda",
    "name": "Ajuda",
    "actionType": "Ação",
    "summary": "AJUDA\nVocê pode prestar ajuda para que outro personagem complete uma tarefa. Quando realiza a ação Ajudar, o personagem\nque recebe sua ajuda ganha vantagem no próximo Teste de Atributo que ele fizer para completar essa tarefa, desde que o\nteste seja feito antes do início do seu próximo turno.\nAlternativamente, você pode ajudar um aliado a atacar um inimigo que esteja até 1,5 metro de você. Você pode fingir,\ndistrair o alvo ou trabalhar em equipe para tornar o ataque do seu aliado mais eficaz. Se seu aliado atacar o alvo antes do\ninício do seu próximo turno, o primeiro ataque que ele fizer contra o alvo terá vantagem.",
    "exactText": "AJUDA\nVocê pode prestar ajuda para que outro personagem complete uma tarefa. Quando realiza a ação Ajudar, o personagem\nque recebe sua ajuda ganha vantagem no próximo Teste de Atributo que ele fizer para completar essa tarefa, desde que o\nteste seja feito antes do início do seu próximo turno.\nAlternativamente, você pode ajudar um aliado a atacar um inimigo que esteja até 1,5 metro de você. Você pode fingir,\ndistrair o alvo ou trabalhar em equipe para tornar o ataque do seu aliado mais eficaz. Se seu aliado atacar o alvo antes do\ninício do seu próximo turno, o primeiro ataque que ele fizer contra o alvo terá vantagem."
  },
  {
    "id": "atacar",
    "name": "Atacar",
    "actionType": "Ação",
    "summary": "ATACAR\nA ação mais comum em combate é a ação Atacar, seja desferindo um soco, lançando um golpe, ou disparando projéteis de\nenergia. Com essa ação, você realiza um ataque corpo-a-corpo ou à distância. Veja a seção Realizando um Ataque para as\nregras que regem os ataques.\nCertas habilidades, como o Ataque Extra das classes, permitem que você realize mais de um ataque com essa ação.",
    "exactText": "ATACAR\nA ação mais comum em combate é a ação Atacar, seja desferindo um soco, lançando um golpe, ou disparando projéteis de\nenergia. Com essa ação, você realiza um ataque corpo-a-corpo ou à distância. Veja a seção Realizando um Ataque para as\nregras que regem os ataques.\nCertas habilidades, como o Ataque Extra das classes, permitem que você realize mais de um ataque com essa ação."
  },
  {
    "id": "disparada",
    "name": "Disparada",
    "actionType": "Ação",
    "summary": "DISPARADA\nQuando você realiza a ação Disparada, você ganha deslocamento adicional no seu turno atual, equivalente ao seu valor de\ndeslocamento, depois de aplicar qualquer modificador. Por exemplo, se o seu deslocamento é de 9 metros, você pode se\nmover até 18 metros no turno se realizar uma disparada.\nAumentos ou reduções no seu deslocamento afetam essa ação de forma proporcional. Se seu deslocamento for reduzido\npara 4,5 metros, você pode se mover até 9 metros ao realizar a disparada.",
    "exactText": "DISPARADA\nQuando você realiza a ação Disparada, você ganha deslocamento adicional no seu turno atual, equivalente ao seu valor de\ndeslocamento, depois de aplicar qualquer modificador. Por exemplo, se o seu deslocamento é de 9 metros, você pode se\nmover até 18 metros no turno se realizar uma disparada.\nAumentos ou reduções no seu deslocamento afetam essa ação de forma proporcional. Se seu deslocamento for reduzido\npara 4,5 metros, você pode se mover até 9 metros ao realizar a disparada."
  },
  {
    "id": "esconder",
    "name": "Esconder",
    "actionType": "Ação",
    "summary": "ESCONDER\nAo optar pela ação Esconder, você faz um Teste de Destreza (Furtividade) para tentar se esconder, seguindo as regras do\nCapítulo 11 sobre esconder-se. Se for bem-sucedido, você ganha benefícios como descrito na seção Atacantes Não Vistos\ne Alvos mais à frente neste capítulo.",
    "exactText": "ESCONDER\nAo optar pela ação Esconder, você faz um Teste de Destreza (Furtividade) para tentar se esconder, seguindo as regras do\nCapítulo 11 sobre esconder-se. Se for bem-sucedido, você ganha benefícios como descrito na seção Atacantes Não Vistos\ne Alvos mais à frente neste capítulo."
  },
  {
    "id": "esquivar",
    "name": "Esquivar",
    "actionType": "Ação",
    "summary": "ESQUIVAR\nAo realizar a ação de Esquivar, você se concentra totalmente em evitar ataques. Até o início do seu próximo turno,\nqualquer ataque contra você é feito com desvantagem, desde que você possa ver o atacante, e você tem vantagem em\nSalvaguardas de Destreza. Você perde esse benefício se ficar incapacitado ou se seu deslocamento for reduzido a 0.",
    "exactText": "ESQUIVAR\nAo realizar a ação de Esquivar, você se concentra totalmente em evitar ataques. Até o início do seu próximo turno,\nqualquer ataque contra você é feito com desvantagem, desde que você possa ver o atacante, e você tem vantagem em\nSalvaguardas de Destreza. Você perde esse benefício se ficar incapacitado ou se seu deslocamento for reduzido a 0."
  },
  {
    "id": "improvisando-uma-a-o",
    "name": "Improvisando Uma Ação",
    "actionType": "Ação",
    "summary": "IMPROVISANDO UMA AÇÃO\nSeu personagem pode tentar coisas que não estão cobertas pelas ações descritas neste capítulo, como quebrar uma porta,\nintimidar um adversário, sentir uma fraqueza nas defesas de alguém ou negociar uma trégua. O único limite para as ações\nque você pode tentar é a sua imaginação e as capacidades do seu personagem. Quando você descreve uma ação não\ndetalhada nas regras, o Narrador dirá se ela é possível e que tipo de jogada você precisará realizar para determinar seu\nsucesso ou fracasso.",
    "exactText": "IMPROVISANDO UMA AÇÃO\nSeu personagem pode tentar coisas que não estão cobertas pelas ações descritas neste capítulo, como quebrar uma porta,\nintimidar um adversário, sentir uma fraqueza nas defesas de alguém ou negociar uma trégua. O único limite para as ações\nque você pode tentar é a sua imaginação e as capacidades do seu personagem. Quando você descreve uma ação não\ndetalhada nas regras, o Narrador dirá se ela é possível e que tipo de jogada você precisará realizar para determinar seu\nsucesso ou fracasso."
  },
  {
    "id": "preparar",
    "name": "Preparar",
    "actionType": "Ação",
    "summary": "PREPARAR\nÀs vezes, você pode querer esperar um momento oportuno para agir, como emboscar um vilão ou esperar o momento\ncerto para usar sua técnica especial. Para isso, você pode usar a ação Preparar no seu turno e agir mais tarde na rodada,\nusando sua reação. Você tem até o início do seu próximo turno para usar a ação preparada.\nPrimeiro, você decide qual será o gatilho perceptível para sua reação. Então, escolhe a ação que realizará em resposta ao\ngatilho ou decide se mover em resposta ao gatilho. Exemplos incluem: \"Se o vilão entrar na minha linha de visão, eu vou\ndisparar minha técnica\" ou \"Se o inimigo se aproximar, eu vou recuar.\"\n\nQuando o gatilho ocorrer, você pode realizar sua reação imediatamente ou ignorá-lo. Lembre-se de que só pode realizar\numa reação por turno.\nSe você preparar uma técnica, pode manter a energia até o gatilho ocorrer, mas isso exige concentração. Se sua\nconcentração for quebrada, a técnica se dissipa sem efeito.",
    "exactText": "PREPARAR\nÀs vezes, você pode querer esperar um momento oportuno para agir, como emboscar um vilão ou esperar o momento\ncerto para usar sua técnica especial. Para isso, você pode usar a ação Preparar no seu turno e agir mais tarde na rodada,\nusando sua reação. Você tem até o início do seu próximo turno para usar a ação preparada.\nPrimeiro, você decide qual será o gatilho perceptível para sua reação. Então, escolhe a ação que realizará em resposta ao\ngatilho ou decide se mover em resposta ao gatilho. Exemplos incluem: \"Se o vilão entrar na minha linha de visão, eu vou\ndisparar minha técnica\" ou \"Se o inimigo se aproximar, eu vou recuar.\"\n\nQuando o gatilho ocorrer, você pode realizar sua reação imediatamente ou ignorá-lo. Lembre-se de que só pode realizar\numa reação por turno.\nSe você preparar uma técnica, pode manter a energia até o gatilho ocorrer, mas isso exige concentração. Se sua\nconcentração for quebrada, a técnica se dissipa sem efeito."
  },
  {
    "id": "procurar",
    "name": "Procurar",
    "actionType": "Ação",
    "summary": "PROCURAR\nAo realizar a ação Procurar, você foca em encontrar algo específico. Dependendo da situação, o Narrador pode pedir que\nvocê faça um Teste de Vontade (Percepção) ou de Vontade (Investigação).",
    "exactText": "PROCURAR\nAo realizar a ação Procurar, você foca em encontrar algo específico. Dependendo da situação, o Narrador pode pedir que\nvocê faça um Teste de Vontade (Percepção) ou de Vontade (Investigação)."
  },
  {
    "id": "usar-um-objeto",
    "name": "Usar um Objeto",
    "actionType": "Ação",
    "summary": "USAR UM OBJETO\nNormalmente, você interage com objetos enquanto realiza outras ações, como sacar sua arma antes de um ataque. Quando\num objeto requer que você use sua ação para manipulá-lo, você realiza a ação Usar um Objeto. Essa ação também é útil se\nvocê quiser interagir com mais de um objeto durante seu turno.",
    "exactText": "USAR UM OBJETO\nNormalmente, você interage com objetos enquanto realiza outras ações, como sacar sua arma antes de um ataque. Quando\num objeto requer que você use sua ação para manipulá-lo, você realiza a ação Usar um Objeto. Essa ação também é útil se\nvocê quiser interagir com mais de um objeto durante seu turno."
  }
];
