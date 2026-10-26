'use strict';

// 규칙은 위에서부터 검사하며 대화방별 주제와 진행 상태를 저장합니다
const CHAT_PEOPLE = {
  '좋아해': 'donghyeon', 'kdhxxn_': 'donghyeon',
  '똥개의 일상': 'jaehyeon', 'myeongmyeong': 'jaehyeon',
  '돼지': 'woonhak', 'freshboyy._.': 'woonhak',
  '펌킨팍': 'seongho', '펌킨박': 'seongho', '상혁이형': 'sanghyeok'
};

const REPLY_BANK = {
  donghyeon: {
    greet: [['왜','나 인문관인데'],['어','너 어디야'],['지금 봤어','무슨 일인데']],
    food: [['밥 아직 안 먹었어','같이 먹게'],['라면?','너네 집 가면 됨?'],['오늘은 국밥 먹자','정문 앞으로 나와']],
    aqua: [['인어쇼 2시래','나 그거 봐야 됨'],['코리도라스 있는 쪽부터 보자','너도 보면 좋아할걸'],['이번엔 다른 데 가자','내가 찾아볼게']],
    work: [['나도 아직 안 냈어','왜 이렇게 하기 싫지'],['물레 작업하다가 시간 다 감','교양은 언제 하지'],['너 먼저 했으면 알려줘','그대로 베끼진 않고']],
    location: [['나 인문관 앞','너 어디냐고'],['아직 학교','너 기다리는 중'],['정문까지 갈까?','어디로 나오는데']],
    date: [['엥','누가 그래','나 여친 없는데'],['뭐래','갑자기 왜 물어봐'],['그냥 친구랑 간 건데','너도 아는 애는 아님']],
    affection: [['뭐래','장난치냐?'],['갑자기?','무슨 일 있어?'],['전화로 말해봐','채팅으로 뭔 소린지 모르겠음']],
    thanks: [['뭘ㅋㅋ','밥이나 사'],['ㅇㅋ','다음엔 네가 사'],['됐어','늦지나 마']],
    joke: [['ㅋㅋㅋㅋㅋㅋ','아니 진짜로'],['뭐래ㅋㅋ','말 돌리지 말고'],['황당하네','그래서 올 거야?']],
    tired: [['어제 늦게 잤어?','밥은 먹고 자'],['그러면 오늘은 쉬어','아쿠아리움은 다음에 가고'],['무리하지 말고','필요한 거 있으면 말해']],
    default: [['?','왜'],['뭔데','좀 자세히 말해봐'],['아니 그래서','너 언제 와?'],['나 인문관 앞이라니까','카톡 좀 봐'],['전화할까?','말로 해봐'],['ㅇㅇ 보고 있어','계속 말해']]
  },
  jaehyeon: {
    food:[['ㅋㅋㅋㅋ 또 동현이랑 먹냐','난 성호랑 먹을 건데'],['제육 말고 다른 거 먹자ㅋㅋㅋㅋ','운학이한테 말해봐'],['정문으로 와','다 같이 먹게']],
    aqua:[['ㅋㅋㅋㅋㅋㅋ 또?','동현이가 가자고 했냐'],['너네 진짜 그만 붙어다녀ㅋㅋㅋㅋ','이번엔 어디 가는데'],['물고기 보러 간다면서','사진엔 맨날 둘만 있더라ㅋㅋㅋㅋ']],
    work:[['나도 과제 중ㅋㅋㅋㅋ','아니 왜 맨날 마감이냐'],['성호한테 물어봐','걔는 해놨을걸'],['일단 제출부터 해ㅋㅋㅋㅋ','완벽하게 하려다가 늦지 말고']],
    affection:[['ㅋㅋㅋㅋㅋㅋ','동민아 너 티 좀 나'],['난 뭐 말 안 했다ㅋㅋㅋㅋ','네가 알아서 해'],['직접 얘기해봐','술 먹고 하지 말고ㅋㅋㅋㅋ']],
    location:[['나 경영관ㅋㅋㅋㅋ','왜'],['성호 찾으러 가는 중','너 걔 봤냐'],['동방엔 동현이 없다ㅋㅋㅋㅋ','또 찾냐']],
    greet:[['ㅋㅋㅋㅋ 왔냐','폰은 찾았고?'],['야 동민아','무슨 일이냐']],
    thanks:[['뭘ㅋㅋㅋㅋ','나중에 밥 사'],['ㅇㅋㅋㅋㅋㅋ','다음엔 폰 잘 챙기고']],
    joke:[['ㅋㅋㅋㅋㅋㅋㅋㅋ','너 진짜 웃긴다'],['이런 거 보내지 마라ㅋㅋㅋㅋ','수업 중에 봤잖아']],
    tired:[['ㅋㅋㅋㅋ 일단 좀 자','밥도 먹고'],['무슨 일 있냐','장난 안 칠 테니까 말해봐']],
    default:[['ㅋㅋㅋㅋ 그래서?','계속 말해봐'],['야 동민아','그건 네가 직접 물어봐'],['성호한테도 물어볼까?','걔 지금 옆에 있음'],['ㅋㅋㅋㅋ 알겠어','그래서 뭐 도와주면 되는데']]
  },
  woonhak: {
    food:[['형 제육 먹을래요?','정문 앞 백반집이요'],['오늘은 국밥이에요','동현이형이 고름'],['안 온다면서요!!','동현이형 얘기하면 바로 오네']],
    aqua:[['또 가요?','동현이형 진짜 좋아하네'],['저도 사진 보여줘요','물고기 말고 밥 사진도'],['형 이번에도 밥 사주는 거예요?','아니 그냥 궁금해서요']],
    work:[['저도 과제 있어요 형','이번 주 진짜 많아요'],['아직 안 끝났어요','끝나면 연락할게요'],['형 제출부터 해요','마감 지나면 진짜 안 받아요']],
    coat:[['형 제 잠바요!!','언제 주실 건데요'],['도서관이요?','제가 가지러 갈게요'],['이번엔 진짜 챙겨줘요','저 추워요 형']],
    affection:[['네?','그걸 왜 저한테 물어봐요'],['동현이형한테 물어봐요','제가 어떻게 알아요!!'],['형 일단 직접 말해봐요','저는 아무 말 안 할게요']],
    location:[['저 체육관이요','왜요 형'],['과방인데요','동현이형 찾는 거예요?'],['정문 앞이에요','5분이면 와요?']],
    greet:[['형!!','폰 찾은 거예요?'],['왜요 형','무슨 일인데요']],
    thanks:[['그럼 잠바 돌려줘요','진짜로'],['네ㅋㅋ','밥 사줘요 형']],
    joke:[['아 형 진짜!!','저 또 속이는 거죠'],['그만 놀려요','이번엔 안 믿어요']],
    tired:[['형 밥은 먹었어요?','안 먹었으면 같이 먹어요'],['오늘은 좀 쉬어요','내일 봐도 되잖아요']],
    default:[['네?','무슨 말이에요 형'],['형 천천히 말해요','저 지금 보고 있어요'],['아니 왜 저한테만 그래요!!','진짜 억울하네'],['그래서 제가 뭐 하면 돼요?','말해봐요']]
  },
  seongho: {
    food:[['밥은 먹었어?','안 먹었으면 같이 먹자'],['메뉴부터 정하자','어디가 괜찮아?'],['정문에서 볼까?','몇 시에 끝나는데?']],
    aqua:[['동현이랑 가는 거야?','과제는 끝냈고?'],['몇 시에 돌아와?','수업 겹치지는 않아?'],['다녀와','물건 놓고 오지 말고']],
    work:[['어떤 과제인데?','마감부터 확인해봐'],['제출 형식은 확인했어?','파일도 다시 열어보고'],['급한 것부터 해','끝나면 연락하고']],
    affection:[['동민아','그건 동현이한테 직접 물어보는 게 낫지 않을까'],['확실히 들은 얘기야?','짐작만 하고 있는 건 아니고?'],['지금 바로 결론 내리지 말고','천천히 생각해봐']],
    location:[['나 도서관','무슨 일 있어?'],['재현이 찾는 거야?','나도 못 봤어'],['정문으로 나갈게','어디쯤이야?']],
    greet:[['동민아','폰은 찾았어?'],['왜?','무슨 일인데?']],
    thanks:[['괜찮아','다음부터 잘 챙겨'],['응','필요하면 다시 연락해']],
    joke:[['재현이가 시켰어?','또 무슨 장난인데'],['동민아','그건 안 할게']],
    tired:[['어디 아픈 건 아니지?','밥은 먹었어?'],['일단 쉬어','급한 일은 내가 확인할게']],
    default:[['어떤 얘기인지 조금 더 말해줄래?'],['그건 확인해봐야겠네','언제 있었던 일이야?'],['알겠어','그럼 어떻게 할 생각인데?'],['동민아','필요한 게 있으면 정확하게 말해줘']]
  },
  sanghyeok: {
    food:[['아직 안 먹었으면 같이 먹자','뭐 먹고 싶어?'],['동현이도 부를까?','너 괜찮으면'],['이번엔 네가 사는 거지','전에 한 말 기억한다']],
    aqua:[['동현이랑 가는 거구나','잘 다녀와'],['너도 즐거워야지','걔가 좋아해서만 가지 말고'],['사진 잘 찍고','무리해서 일정 맞추지는 마']],
    work:[['어디까지 했어?','막히는 부분부터 말해봐'],['일단 초안이라도 만들어','같이 확인해줄게'],['오늘은 과제부터 끝내자','나머지는 내일 생각하고']],
    affection:[['동민아','술 먹고 얘기하지는 말고','멀쩡할 때 네 말로 해'],['걔 마음까지 내가 알 수는 없지','너도 너무 먼저 겁먹지는 마'],['급하게 결론 내리지 마','네가 편하게 말할 수 있을 때 해'],['재현이가 눈치챈 것 같긴 해','그래도 내가 먼저 말할 일은 없어']],
    location:[['나 도서관','동현이는 지금 옆에 없어'],['정문 쪽으로 갈게','너 수업 끝났어?'],['겉옷 갖고 있으면 기다려','내가 가지러 갈게']],
    greet:[['동민아','폰 찾았어?'],['응','무슨 일이야']],
    thanks:[['괜찮아','너무 신경 쓰지 마'],['밥 산다는 말은 기억할게','일단 오늘 할 일부터 해']],
    joke:[['너 또 무슨 생각 하는데','말해봐'],['그 장난은 동현이한테 해','나는 안 속는다']],
    tired:[['괜찮아?','무슨 일 있었어?'],['지금 혼자 있어?','필요하면 내가 갈게'],['오늘은 좀 쉬어','혼자 다 해결하려고 하지 말고']],
    default:[['응 듣고 있어','편하게 말해봐'],['그때 너는 어땠는데?','그게 더 중요하지'],['알겠어','내가 뭘 도와주면 될까?'],['급하게 답 안 해도 돼','생각 정리되면 말해']]
  }
};

function chatIdentity(name) { return CHAT_PEOPLE[name] || null;
 }
function nextBank(state, person, topic) {
  const bank = REPLY_BANK[person][topic] || REPLY_BANK[person].default;

  state.counts ||= {};

  const count = state.counts[topic] || 0;

  state.counts[topic] = count + 1;

  return bank[count % bank.length];

}
function generateReply(name, text, conversation) {
  const person = chatIdentity(name);

  if (!person) return [];

  const state = conversation.dialogue ||= { topic: null, found: !!conversation.foundPhone, stage: 'start', counts: {} };

  const s = text.trim().toLowerCase();

  const pick = topic => { state.topic = topic;
 return nextBank(state, person, topic);
 };

  if (/주웠|주우|주운|습득|폰.*발견/.test(s) && !/안\s*주웠|못\s*주웠|안\s*주운/.test(s)) {
    state.found = true;
 conversation.foundPhone = true;
 state.stage = 'location';

    return {
      donghyeon:['아 동민이 폰을 주우신 거예요?','지금 어디 계세요?'],
      jaehyeon:['아 주우셨구나','동민이 아는 형이에요ㅋㅋㅋㅋ','제가 받으러 가도 될까요?'],
      woonhak:['아 형 폰 주우셨어요?','저 동민이형 동생이에요','어디로 가면 돼요?'],
      seongho:['알려주셔서 감사합니다','동민이 지인이에요','어디에서 주우셨나요?'],
      sanghyeok:['아 주우셨구나','동민이 아는 형이에요','제가 대신 받으러 가도 될까요?']
    }[person];

  }
  if (person === 'donghyeon' && /저장명|좋아해로|좋아해라고/.test(s)) {
    state.topic = 'savedname';

    return nextBank(state, person, 'savedname').length && [
      ['제 저장명이요?','좋아해라고 돼 있다고요?','아','일단 폰부터 받을 수 있을까요?'],
      ['저도 지금 처음 알았어요','그건 동민이한테 직접 물어볼게요'],
      ['저는 그냥 친구인데','지금은 폰부터 받아야 할 것 같아요']
    ][(state.counts.savedname-1)%3];

  }
  if (state.found) {
    if (/사랑|고백|짝사랑|사귀|좋아하|저장명/.test(s)) return person==='donghyeon'?['그건 동민이한테 직접 물어볼게요','제가 대신 대답할 수는 없어서요']:['그건 제가 함부로 말씀드릴 얘기는 아닌 것 같아요','폰만 전해주시면 감사하겠습니다'];

    if (/돈|사례|보상/.test(s)) return ['찾아주셔서 감사해요','사례는 동민이랑 직접 이야기해주실 수 있을까요?'];

    if (/비번|비밀번|잠금/.test(s)) return ['잠금은 그대로 두셔도 돼요','제가 가서 동민이한테 전해줄게요'];

    if (/누구|성함|이름|관계/.test(s)) return {
      donghyeon:['김동현이요','동민이랑 같은 학년 친구예요'],jaehyeon:['명재현이에요','동민이 아는 형이에요'],woonhak:['김운학이요','동민이형 아는 동생이에요'],seongho:['박성호입니다','동민이 아는 형이에요'],sanghyeok:['이상혁이에요','동민이랑 친한 형이에요']
    }[person];

    if (/전화|연락처|번호/.test(s)) return ['이 채팅으로 연락 주시면 돼요','도착하면 여기로 다시 연락드릴게요'];

    if (/못\s*기다|바빠|급해|가야/.test(s)) return ['그러시면 근처 안내데스크에 맡겨주실 수 있을까요?','맡긴 곳만 알려주시면 제가 찾아갈게요'];

    if (/안내데스크|경비실|분실물|맡겼|맡겨/.test(s)) { state.stage='deposited';
 return ['네 어디에 맡기셨는지 확인했어요','제가 가서 찾아볼게요','알려주셔서 감사합니다'];
 }
    if (/배터리|꺼질|충전/.test(s)) return ['충전까지 해주실 필요는 없어요','꺼지기 전에 위치만 알려주실 수 있을까요?'];

    if (/언제|몇\s*분|얼마나|도착했/.test(s)) return state.stage==='location'?['계신 곳부터 알려주시면','걸리는 시간 확인해볼게요']:['5분 정도 걸릴 것 같아요','도착하면 채팅드릴게요'];

    if (/어디|어느\s*쪽/.test(s)) return person==='donghyeon'?['저는 지금 인문관 앞이에요','계신 곳 알려주시면 그쪽으로 갈게요']:['저는 지금 학교에 있어요','어디로 가면 될까요?'];

    if (/인문관|정문|후문|도서관|카페|학교|\d+층|앞에|앞이|옆에|주소|편의점|건물/.test(s)) { state.stage='meeting';
state.place=text;
return ['네 위치 확인했어요','그쪽으로 갈게요','잠깐만 기다려 주세요'];
 }
    if (/고마|감사|천만/.test(s)) return ['저희가 더 감사하죠','찾아주셔서 정말 감사합니다'];

    if (/^(네|넵|넹|예|응|ㅇㅇ|ㅇㅋ|알겠|기다|오케)/.test(s)) return state.stage==='meeting'?['네 출발했어요','도착하면 다시 연락드릴게요']:state.stage==='deposited'?['네 감사합니다','제가 가서 확인할게요']:['감사합니다','계신 곳 알려주시면 제가 갈게요'];

    return state.stage==='meeting'?['네 말씀하신 곳으로 가고 있어요','조금만 기다려 주세요']:['혹시 지금 계신 곳을 알려주실 수 있을까요?','제가 직접 받으러 가겠습니다'];

  }
  if (/고백|짝사랑|좋아하|사귀|마음.*말/.test(s)) return pick('affection');

  if (person==='donghyeon' && /여친|여자친구/.test(s)) return pick('date');

  if (/아쿠아리움|물고기|코리도라스|인어|수조/.test(s)) return pick('aqua');

  if (person==='woonhak' && /잠바|겉옷|점퍼|자켓/.test(s)) return pick('coat');

  if (/밥|라면|제육|국밥|점심|저녁|배고|뭐\s*먹|먹을/.test(s)) return pick('food');

  if (/과제|교양|제출|마감|팀플|물레|작업/.test(s)) return pick('work');

  if (/피곤|힘들|아파|우울|잠이|졸려|쉬고/.test(s)) return pick('tired');

  if (/어디|ㅁㅎ|뭐\s*해|뭐해/.test(s)) return pick('location');

  if (/고마|감사/.test(s)) return pick('thanks');

  if (/ㅋㅋ|ㅎㅎ|장난|릴스/.test(s)) return pick('joke');

  if (/전화|통화/.test(s)) return person==='donghyeon'?['왜','걸어']:['지금 말해도 돼','무슨 일이야?'];

  if (/몇\s*시|언제|시간|내일|오늘/.test(s)) {
    if(state.topic==='aqua') return person==='donghyeon'?['2시','인문관 앞에서 보자']:['수업 끝나고 갈까?','몇 시가 괜찮아?'];

    if(state.topic==='food') return person==='woonhak'?['1시 반이요','정문 앞 백반집']:['수업 끝나고 보자','끝나는 시간 알려줘'];

    if(state.topic==='work') return ['오늘 안에 끝내야 돼','너는 어디까지 했어?'];

    return person==='donghyeon'?['지금 나와','기다리고 있어']:['언제가 편해?','네 일정부터 알려줘'];

  }
  if (/^(응|ㅇㅇ|ㅇㅋ|네|넵|넹|알겠|오케|좋아|갈게|그래)[! ?ㅋㅋㅎ]*$/.test(s)) {
    if(state.topic==='food') return person==='woonhak'?['자리 잡아둘게요','빨리 와요 형']:['ㅇㅋ','자리 잡아둘게'];

    if(state.topic==='aqua') return person==='donghyeon'?['ㅇㅋ','늦지 마']:['다녀와','사진도 보여줘'];

    if(state.topic==='affection') return person==='sanghyeok'?['응','네가 정한 대로 해','내가 먼저 말하지는 않을게']:['그래','너무 급하게 생각하지 말고'];

    if(state.topic==='work') return ['끝나면 연락해','나도 마저 할게'];

    return ['ㅇㅋ','무슨 일 있으면 다시 말해'];

  }
  if (/왜|어떻게|뭔데|무슨\s*뜻|그다음|더\s*말/.test(s) && state.topic) return nextBank(state,person,state.topic);

  if (!state.prompted && person!=='donghyeon') { state.prompted=true;
return {jaehyeon:['ㅋㅋㅋㅋ 동민이 폰 찾았냐?','어디 두고 온 건데'],woonhak:['형 폰 찾았어요?','진짜 찾은 거예요?'],seongho:['동민아 폰은 찾았어?','어디에 두고 온 거야?'],sanghyeok:['동민아 폰 찾았어?','걱정했잖아']}[person];
 }
  if (/안녕|하이|야$|형$/.test(s)) return pick('greet');

  return nextBank(state,person,'default');

}
// Pending tasks are transient and never serialized into localStorage
const CHAT_QUEUES = new Map();

queueReplies10 = function(type, index, text) {
  const conversation=social[type][index];

  if(!chatIdentity(conversation.name)) return;

  const key=type+':'+index;

  let queue=CHAT_QUEUES.get(key);

  if(!queue) {queue={items:[],busy:false};
CHAT_QUEUES.set(key,queue);
}
  queue.items.push(text);

  if(queue.busy) return;

  queue.busy=true;

  function process() {
    if(!queue.items.length){queue.busy=false;
return;
}
    const lines=generateReply(conversation.name,queue.items.shift(),conversation).map(s=>s.replace(/\./g,''));

    let cursor=0;

    function emit(){
      if(cursor>=lines.length){if(typeof finishStoryReply==='function')finishStoryReply(conversation);
process();
return;
}
      setTimeout(()=>{
        conversation.messages.forEach(m=>{if(m.out)m.delivered=true;
});

        conversation.messages.push({out:false,text:lines[cursor++],ts:Date.now(),user10:true});

        const visible=visibleConversation();

        conversation.read=!!visible&&visible.c===conversation;

        saveSocial();

        if(conversation.read)renderVisibleMessages();

        emit();

      },850);

    }
    emit();

  }
  process();

};


'use strict';

const previousGenerateReply = generateReply;

generateReply = function(name, text, conversation) {
  const person = chatIdentity(name);

  if (!person) return [];

  const state = conversation.dialogue ||= {topic:null,found:!!conversation.foundPhone,stage:'start',counts:{}};

  const s = text.trim().toLowerCase();

  const cycle = (topic, bank) => {
    state.topic = topic;

    state.counts ||= {};

    const n = state.counts[topic] || 0;

    state.counts[topic] = n + 1;

    return bank[n % bank.length];

  };

  const disclosure = /주웠|주우|주운|습득|폰.*발견/.test(s) && !/안\s*주웠|못\s*주웠|안\s*주운/.test(s);

  if (disclosure) return previousGenerateReply(name, text, conversation);

  const relation = /무슨\s*사이|어떤\s*사이|뭔\s*사이|사이가|사이야|사이예|사이에|관계|친구야|친구예|친구인|애인|남자친구|남친/.test(s);

  const affection = /좋아해|좋아하|사랑해|사랑하|고백|마음.*있|마음.*알/.test(s);

  const shortFollow = /^(왜|왜요|그래서|그럼|진짜|진심|정말|응|ㅇㅇ|네|어|맞아|장난\s*아니야|뭐라고|뭔데|말해봐|계속|어떻게)[? !ㅋㅎ]*$/.test(s);

  if (state.found) {
    if (person === 'donghyeon' && relation) return cycle('finder-relation', [
      ['동민이랑 친구예요','같은 학년이고요','제가 받으러 가도 괜찮을까요?'],
      ['네 친구 맞아요','평소에도 같이 다녀서요','동민이한테 제가 받는다고 전해둘게요'],
      ['다른 사이는 아니고 친구예요','혹시 본인한테 확인이 필요하시면','제가 동민이 연락할 방법부터 찾아볼게요']
    ]);

    if (person === 'donghyeon' && (affection || /저장명|좋아해로|좋아해라고/.test(s))) return cycle('finder-affection', [
      ['잠깐만요','그렇게 저장돼 있다고요?','저는 처음 듣는 얘기라서요','그건 동민이한테 직접 물어볼게요'],
      ['동민이가 저를요?','제가 여기서 무슨 말을 하기는 좀 그래서요','일단 폰부터 받을 수 있을까요?'],
      ['네 무슨 말씀인지는 알겠어요','근데 동민이 없는 데서 얘기하고 싶지는 않아요','직접 만나서 물어볼게요']
    ]);

    if (person === 'donghyeon' && shortFollow && /^finder-/.test(state.topic || '')) return cycle('finder-follow', [
      ['저도 지금 처음 안 거라서요','친구인 건 맞아요','나머지는 동민이랑 얘기할게요'],
      ['제가 대신 대답할 얘기는 아닌 것 같아요','혹시 폰은 어디로 받으러 가면 될까요?']
    ]);

    return previousGenerateReply(name,text,conversation);

  }
  if (/(폰|핸드폰|휴대폰).*(찾았|찾음|찾앗|찾았어|되찾)|찾았.*(폰|핸드폰|휴대폰)/.test(s)) {
    return cycle('phone-recovered', {
      donghyeon:[['아 찾았어?','다행이네','어디 두고 온 건데'],['한참 연락 안 돼서','나 계속 인문관 앞에 있었잖아','폰 챙기고 나와'],['ㅇㅇ 찾았으면 됐어','또 놓고 다니지 말고','지금 어디야']],
      jaehyeon:[['ㅋㅋㅋㅋㅋㅋ 찾았냐','다행이다 진짜','어디서 나왔는데'],['야 다음엔 잘 챙겨ㅋㅋㅋㅋ','다들 너 찾고 있었잖아']],
      woonhak:[['형 찾았어요?','와 다행이다','제가 얼마나 연락했는데요!!'],['이제 진짜 잘 챙겨요','폰 찾았으면 제 잠바도 찾아줘요']],
      seongho:[['찾아서 다행이네','어디 있었어?','다른 건 잃어버린 거 없고?'],['응 다행이다','걱정한 사람들한테 연락부터 해줘']],
      sanghyeok:[['찾았구나','다행이다','많이 놀랐지'],['이제 잘 챙기고','다른 애들한테도 찾았다고 알려줘']]
    }[person]);

  }
  if (person === 'sanghyeok' && /들켰|들킨|눈치|알아챘|알아버|알게\s*된|알게\s*됐/.test(s) && (/동현|좋아|마음|고백/.test(s) || state.topic === 'exposed')) return cycle('exposed', [
    ['동현이가 뭐라고 했는데?','네가 좋아하는 걸 알았다고 직접 말했어?','일단 있었던 일부터 말해봐'],
    ['동민아 아직 모르는 거잖아','당황해서 먼저 장난이었다고 하지는 말고','걔가 어떻게 반응했는지 보자'],
    ['알게 됐다고 해서 바로 나쁜 쪽으로 생각하지 마','걔 마음은 걔한테 들어야 아는 거니까','네가 말할 준비가 됐는지가 먼저야']
  ]);

  if (person === 'sanghyeok' && state.topic === 'exposed' && !/밥|과제|아쿠아리움|어디/.test(s)) return cycle('exposed', [
    ['갑자기 알게 된 거면 걔도 놀랐겠지','바로 대답 안 했다고 싫다는 뜻은 아니야','너는 지금 어떻게 하고 싶어?'],
    ['네 마음까지 없던 일로 만들지는 마','얘기할 거면 둘이 있을 때 해','내가 먼저 동현이한테 말하지는 않을게'],
    ['응 나한테는 편하게 말해','걔한테 뭐라고 보낼지 같이 생각해보자','지금 답장 왔어?']
  ]);

  if (person === 'donghyeon' && relation) return cycle('our-relation', [
    ['갑자기?','우리?','왜 그런 걸 물어봐'],
    ['아니','친구긴 한데','네가 물으니까 뭐라고 해야 될지 모르겠네'],
    ['너는 어떻게 생각하는데','나만 대답해야 됨?'],
    ['동민아','그건 만나서 얘기하자','너 지금 어디야']
  ]);

  if (person === 'donghyeon' && affection && !/안\s*좋아|안\s*사랑/.test(s)) return cycle('confession', [
    ['나를?','잠깐','지금 장난치는 거 아니지?'],
    ['아','생각을 못 해서','뭐라고 답해야 될지 모르겠어'],
    ['언제부터?','아니 싫다는 게 아니라','갑자기 들어서 그래'],
    ['동민아','그 얘기 채팅으로만 하기는 좀 그런데','얼굴 보고 얘기하면 안 돼?']
  ]);

  if (person === 'donghyeon' && state.topic === 'confession' && (/장난|진심|진짜|언제|몇\s*달|오래|싫어|부담|대답|미안|왜|응|ㅇㅇ/.test(s))) return cycle('confession', [
    ['장난 아닌 거 알겠어','나도 대충 대답하고 싶지는 않아','조금만 생각할 시간 줘'],
    ['싫어서 이러는 건 아니야','네가 그런 생각 하는 줄은 몰랐으니까','나도 좀 정리해야지'],
    ['미안하다고 하지 마','네가 잘못한 것도 아니잖아','우리 만나서 얘기하자'],
    ['지금 나올 수 있어?','나 인문관 앞에 있을게','피하려는 거 아니니까 와']
  ]);

  if (person === 'donghyeon' && state.topic === 'our-relation' && shortFollow) return cycle('our-relation', [
    ['아니 대답 안 하겠다는 게 아니라','갑자기 물으니까 그렇지','너는 어떤 대답 듣고 싶은데'],
    ['나도 생각 좀 하자','평소처럼 얘기하다가 갑자기 그러니까','너 무슨 일 있는 줄 알았어'],
    ['동민아','이건 얼굴 보고 얘기하자','나 기다리고 있을게']
  ]);

  return previousGenerateReply(name,text,conversation);

};





'use strict';

const beforeStoryReply = generateReply;

const PHONE_STORY = { savedNameKnown:false };

function storyReply(lines, c, topic) { c.dialogue.topic=topic;
 return lines;
 }
generateReply = function(name,text,c) {
 const who=chatIdentity(name);
 if(!who)return [];

 const st=c.dialogue ||= {found:!!c.foundPhone,topic:null,counts:{},stage:'start'};

 const s=text.replace(/\s+/g,'');

 const say=(a,t)=>storyReply(a,c,t);

 const disclosure=/주웠|주우|주운|습득/.test(s)&&!/안주웠|못주웠/.test(s);

 if(disclosure){st.handoff=false;
st.ownerSpeaking=false;
return beforeStoryReply(name,text,c);
}
 if(st.found){
  if(who==='donghyeon'&&/저장명|좋아해.*(저장|연락처|번호)|저장.*좋아해/.test(s))PHONE_STORY.savedNameKnown=true;

  if(st.handoff && !st.ownerSpeaking){
   st.ownerSpeaking=true;

   if(who==='donghyeon'){
    c.pendingStoryCall={name:c.name,kind:'owner',known:PHONE_STORY.savedNameKnown};

    return say(['저 동민인데요','제가 폰 주인이에요','제발 아무 말도 하지 말아주세요','지금 전화드릴게요'],'owner-handoff');

   }
   return say(['저 동민인데요','제가 주인이에요','지금 친구 폰으로 보내고 있어요','제발 좋아해라고 저장돼 있는 번호로는 연락하지 말아주세요'],'owner-handoff');

  }
  if(st.ownerSpeaking){
   if(who==='donghyeon'){c.pendingStoryCall={name:c.name,kind:'owner',known:PHONE_STORY.savedNameKnown};
return say(['제가 금방 갈게요','전화로 말씀드릴게요','제발 아무 말도 하지 말아주세요'],'owner-handoff');
}
   return say(['제가 직접 받으러 갈게요','그 번호에는 연락 안 하신 거죠?','지금 보신 건 비밀로 해주세요'],'owner-handoff');

  }
  if(who!=='donghyeon' && /좋아해|그연락처|그번호|그사람/.test(s)){
   if(/사이|관계/.test(s))return say(['지인의 개인사라 제가 말씀드리기는 힘들어요','폰만 돌려주시면 감사하겠습니다'],'finder-private');

   if(/누구|누군|연락처|번호|저장/.test(s))return say(['그건 알려드릴 수 없어요','동민이 개인 연락처라서요','폰 주인에게 직접 확인해 주세요'],'finder-private');

  }
  if(/(동민|주인).*(어디|행방|만났|찾았|위치)|어디.*(동민|주인)/.test(s)){
   st.handoff=true;

   return say(['방금 동민이랑 만났어요','지금 같이 폰 찾으러 갈 거예요','잠깐만요 본인이 직접 말씀드린대요'],'handoff');

  }
  return beforeStoryReply(name,text,c);

 }
 // Finding one's own phone never discloses the finder identity
 if(/(폰|핸드폰|휴대폰).*(찾았|찾음|찾앗|되찾)|찾았.*(폰|핸드폰|휴대폰)/.test(s))return beforeStoryReply(name,text,c);
 if(who==='donghyeon'&&st.topic==='since-question'){
  if(/모르겠|몰라|말하기싫|비밀/.test(s))return say(['지금 말하기 어려우면','만나서 얘기해도 돼','피하려는 건 아니야'],'since-question');
  c.pendingStoryCall={name:c.name,kind:'confession'};
  return say(['그때부터?','나 진짜 몰랐어','잠깐 전화할게'],'confession-call');
 }
 if(who==='donghyeon'&&/티.*(안났|안낫|안나|났)|진짜.*몰랐|정말.*몰랐|몰랐어|몰랐냐|눈치.*못/.test(s))return say(['진짜 몰랐어','그냥 나랑 잘 맞아서 같이 다니는 줄 알았지','언제부터 좋아했는데?'],'since-question');
 if(who!=='donghyeon'&&/티(가|좀|많이)?(나|났|낫)|어디서.*티|티.*(보여|보였|남)|눈치.*(챘|챗|보여)/.test(s)){
  if(st.topic==='obvious')return say(who==='woonhak'?['그냥 딱 보면 보여요','아직 안 들킨 게 신기한데요 형']:['그냥 딱 보면 보여','아직 안 들킨 게 신기하다'],'obvious');
  return say({jaehyeon:['ㅋㅋㅋㅋㅋㅋ 티 나지','너 동현이 얘기만 나오면 바로 반응하잖아'],seongho:['응 티 나','동현이한테만 유독 그러잖아'],sanghyeok:['응 솔직히 티 나','네가 걔 신경 많이 쓰는 게 보여'],woonhak:['형 진짜 티 나요','동현이형 얘기하면 바로 오면서요']}[who],'obvious');
 }
 if(who==='jaehyeon'&&/성호/.test(s)&&/밥|먹/.test(s))return say(['성호가 먹을 사람 없대서ㅋㅋㅋㅋ','같이 먹는 중','왜 너도 올래?'],'food');
 if(who==='seongho'){
  if(/재현/.test(s)&&/밥|먹/.test(s))return say(['걔가 자꾸 귀찮게 따라와','같이 먹자고 계속 그래서','그냥 같이 먹었어'],'food');
  if(/밥.*먹|먹었/.test(s))return say(['응 먹었어','재현이가 졸라서 같이 먹었어'],'food');
  if(/안쨌|안짼|안째|안쨋|안빠졌/.test(s))return say(['그치? 나 놀랐어','동현이가 너랑 째고 아쿠아리움 간대서'],'class');
  if(/쨌|쨋|째고|짼|빠졌/.test(s))return say(['동민아 너 그러면 안 돼','출석은 챙겨야지','아쿠아리움은 수업 끝나고 가'],'class');
 }
 if(who==='woonhak'){
  if(/바보|돼지|눈사람|고릴라|아기|귀요미/.test(s))return say(['아 형 갑자기 뭐예요!!','또 저 놀리는 거죠'],'nickname');
  if(/잠바|겉옷|점퍼|자켓/.test(s)&&/줄|준|돌려|가져가|챙겨|받아/.test(s))return say(['진짜 주는 거죠?','조금만 기다려요','제가 금방 갈게요'],'coat');
  if(/동현|고백/.test(s)&&/좋아|고백|말하고/.test(s))return say(['동현이형은 망설이는 거 안 좋아해요','형 진심이면 그냥 말해봐요','제가 먼저 얘기하지는 않을게요'],'affection');
 }
 return beforeStoryReply(name,text,c);
};
// Deduplicate only this seeded line, preserving all other history
function storyCallLines(call){
 if(call.kind==='confession')return ['만나서 얘기해 동민아'];
 if(call.kind==='owner')return call.known?['여보세요? 제가 폰 주인인데요','금방 갈게요','[뒤에서 동현] 아니 동민아 내 저장명이 왜 그러냐니까?','[뒤에서 동현] 너 나 좋아해?','아 잠깐만','저 진짜 금방 갈 테니까 조금만 기다려주세요']:['여보세요? 제가 폰 주인인데요','금방 갈게요','혹시 지금 보신 건 전부 비밀로 해주시면 안 될까요?','[뒤에서 동현] 뭔데 그런 부탁을 해?','아 아무것도 아니야','제발 부탁드릴게요 금방 갈게요'];
 return ['여보세요?','폰 주우신 분 맞으시죠?','찾아주셔서 감사합니다','계신 곳 알려주시면 그쪽으로 갈게요'];
}
let storyCallToken=0;
function playStoryCall(call){
 clearInterval(callTimer); const token=++storyCallToken;
 const b=shell('전화',true);panel.classList.add('incall');
 const lines=storyCallLines(call);
 b.innerHTML=`<div class="callperson">${esc(call.name)}</div><div class="callstate" id="callState">통화 중</div><div class="callportrait">${esc(call.name[0])}</div><div class="callcaption" id="callCaption" aria-live="polite">${esc(lines[0])}</div><button class="endcall" aria-label="통화 종료" onclick="endCall()">${phoneIcon}</button><small class="callmock">음성 없는 통화 시뮬레이션</small>`;
 CALLS.unshift({name:call.name,date:new Date(),missed:false});let seconds=0;
 callTimer=setInterval(()=>{if(token!==storyCallToken||!$('#callCaption')){clearInterval(callTimer);return;}seconds++;$('#callState').textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');$('#callCaption').textContent=lines[Math.min(lines.length-1,Math.floor(seconds/3))];},1000);
}
const STORY_CALL_QUEUE=[];let incomingStoryCall=null;
function flushStoryCalls(){if(incomingStoryCall||!STORY_CALL_QUEUE.length)return;incomingStoryCall=STORY_CALL_QUEUE.shift();const el=document.createElement('div');el.id='storyIncoming';el.innerHTML=`<small>전화 · 수신 중</small><strong>${esc(incomingStoryCall.name)}</strong><div><button id="storyReject">거절</button><button id="storyAccept">받기</button></div>`;document.querySelector('.phone').append(el);el.querySelector('#storyAccept').onclick=()=>{const call=incomingStoryCall;el.remove();incomingStoryCall=null;playStoryCall(call);};el.querySelector('#storyReject').onclick=()=>{el.remove();incomingStoryCall=null;flushStoryCalls();};}
function finishStoryReply(c){if(!c.pendingStoryCall)return;STORY_CALL_QUEUE.push(c.pendingStoryCall);delete c.pendingStoryCall;flushStoryCalls();}
const beforeStoryStartCall=startCall;
startCall=function(name='좋아해'){
 const who=chatIdentity(name);const cs=[...social.kakao,...social.dm].filter(c=>who&&chatIdentity(c.name)===who);
 const owner=cs.find(c=>c.dialogue?.ownerSpeaking);
 if(owner)return playStoryCall({name,kind:'owner',known:PHONE_STORY.savedNameKnown});
 if(cs.some(c=>c.dialogue?.found||c.foundPhone))return playStoryCall({name,kind:'finder'});
 beforeStoryStartCall(name);
};
const beforeStoryEndCall=endCall;
endCall=function(){storyCallToken++;beforeStoryEndCall();flushStoryCalls();};

 'use strict';
const noteDates=new Map(NOTES.map((n,i)=>[n,nd(i)]));
nd=function(i){return noteDates.get(NOTES[i])||new Date();};
newNote=function(){const n=['제목 없음',''];NOTES.unshift(n);noteDates.set(n,new Date());note(0);};
let noteRing=false,noteRingTimer;
const oldNoteSix=note;
note=function(i){oldNoteSix(i);const check=()=>{clearTimeout(noteRingTimer);if(noteRing)return;noteRingTimer=setTimeout(()=>{if(/동현|사랑|보고싶/.test(NOTES[i].join(' '))){noteRing=true;STORY_CALL_QUEUE.push({name:'좋아해',kind:'note'});flushStoryCalls();}},1100);};for(const e of panel.querySelectorAll('[contenteditable]'))e.addEventListener('input',check);};
const originalStoryLinesSix=storyCallLines;
storyCallLines=function(c){return c.kind==='note'?['어디야 나 기다리고 있어~~']:originalStoryLinesSix(c);};
function sixRows(type){return social[type].map((c,i)=>({c,i,t:new Date(c.messages?.at(-1)?.ts||c.messages?.at(-1)?.at||0).getTime()||0})).sort((a,b)=>b.t-a.t).map(({c,i})=>socialRow(type,c,i)).join('');}
dmList=function(){const b=igShell();b.innerHTML=`<header class="socialhead"><button onclick="igHome()">${ico('back')}</button><b>hxxnd.min</b><span>✎</span></header><input class="xsearch" placeholder="검색" oninput="filterSocial(this.value)"><h3>메시지</h3>${sixRows('dm')}`;syncUnread13();};
kakaoChats=function(){const b=kShell();b.innerHTML=kHeading('채팅')+sixRows('kakao')+kakaoNav('채팅');};
const socialThreadSix=socialThread;
socialThread=function(type,i){socialThreadSix(type,i);if(type==='dm'){for(const b of panel.querySelectorAll('.threadhead button'))if(b.textContent.includes('☎')||(b.getAttribute('onclick')||'').includes('startCall'))b.remove();}};
const callSvgs={mute:'<path d="M9 9v3a3 3 0 0 0 5 2M9 5a3 3 0 0 1 6 0v5M5 10v2a7 7 0 0 0 12 5M19 10v2M12 19v3M8 22h8M3 2l19 20"/>',keys:'<g fill="currentColor" stroke="none">'+[5,12,19].flatMap(x=>[5,12,19].map(y=>`<circle cx="${x}" cy="${y}" r="2.3"/>`)).join('')+'</g>',speaker:'<path fill="currentColor" d="M3 9h4l5-5v16l-5-5H3z"/><path d="M16 8q5 4 0 8M19 4q9 8 0 16"/>',add:'<path d="M12 3v18M3 12h18"/>',video:'<rect x="2" y="6" width="13" height="12" rx="2"/><path fill="currentColor" d="m16 10 6-4v12l-6-4z"/>',contact:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="3"/><path d="M5 19v-2a7 5 0 0 1 14 0v2"/>'};
const callSvgSix=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${callSvgs[k]}</svg>`;
function styleCallSix(){if(!panel.classList.contains('incall'))return;const body=$('#appBody');if(!body||body.querySelector('.six-call-grid'))return;panel.classList.add('six-call');body.querySelector('.calloptions')?.remove();const grid=document.createElement('div');grid.className='six-call-grid';grid.innerHTML=[['mute','소리 끔'],['keys','키패드'],['speaker','스피커'],['add','통화 추가'],['video','FaceTime'],['contact','연락처']].map(([k,t])=>`<button type="button" aria-pressed="${k==='speaker'}" class="${k==='speaker'?'selected':''}"><span>${callSvgSix(k)}</span><small>${t}</small></button>`).join('');for(const b of grid.querySelectorAll('button'))b.onclick=()=>{b.classList.toggle('selected');b.setAttribute('aria-pressed',b.classList.contains('selected'));};body.append(grid);const end=body.querySelector('.endcall');if(end)end.innerHTML=phoneIcon;}
const callStartSix=startCall;startCall=function(n){callStartSix(n);styleCallSix();};
const storyPlaySix=playStoryCall;playStoryCall=function(c){storyPlaySix(c);styleCallSix();};

'use strict';
const replyBeforeLatest=generateReply;
generateReply=function(name,text,c){
 const p=chatIdentity(name);if(!p)return [];
 const st=c.dialogue ||= {found:!!c.foundPhone,topic:null,counts:{},stage:'start'};
 const s=text.replace(/\s+/g,'');const say=(lines,t)=>{st.latestTopic=t;return lines;};
 if(/(폰|핸드폰|휴대폰).*(찾았|찾음|찾은|찾아서)|찾았.*(폰|핸드폰)|(?:집|학교|가방|주머니|도서관|카페|인문관|여기|거기|방).*에서?찾았/.test(s)&&!/(못찾|안찾|주웠|주운|습득)/.test(s))return say([p==='woonhak'?'아 찾았어요? 다행이다':'찾아서 다행이네',p==='donghyeon'?'그럼 빨리 와':p==='woonhak'?'이번엔 잘 챙겨요 형':'이번엔 잘 챙겨'],'recovered');
 if(st.found)return replyBeforeLatest(name,text,c);
 if(p==='donghyeon'){
  if(/금방가|몇분.*가|곧가|거의다왔/.test(s))return say(['ㅇㅇ 빨리 와','기다리고 있어'],'coming');
  if(/인문관/.test(s)&&/안보|다왔|도착|인데|왔어/.test(s))return say(['나 벤치에 앉아있어','입구 옆에 봐봐'],'bench');
  if(/안좋아해/.test(s))return say(['뭐라는거야','나도 너 안좋아해'],'denial');
  if(/너나좋아|나좋아하지|사랑한다고해|나좋아하냐/.test(s))return say(['내가 널 왜 좋아하냐'],'teasing');
  if(st.latestTopic==='teasing'&&/장난|장냔/.test(s))return say(['아 뭐야 재미없어'],'teasing-end');
  if(st.latestTopic==='teasing'&&/좋아할수도|좋아하면안/.test(s))return say(['이상한 말 하지 마'],'teasing-end');
  if(/궁금하|궁금해서|물어보면안|물어봤/.test(s)&&/왜.*물어|우리\?|친구|사이/.test((c.messages||[]).filter(m=>!m.out).slice(-5).map(m=>m.text).join(' ')))return say(['그런 거 물어보지 마'],'relation-end');
 }
 if(p==='seongho'){
  if(/과제/.test(s)||st.latestTopic==='assignment'||st.topic==='assignment'){
   if(/안했|못했|하지말|얘기.*말|아직|안끝/.test(s))return say(['과제 하고 놀아','미루다가 또 밤새지 말고'],'assignment');
   if(/했|끝냈|완료|다함/.test(s))return say(['잘했어','미리 하는 게 낫지'],'assignment');
  }
 }
 if(p==='woonhak'&&/들켰|맞아|당연하지|놀리는거/.test(s)&&(/놀리/.test((c.messages||[]).filter(m=>!m.out).slice(-4).map(m=>m.text).join(' '))||st.latestTopic==='teased'))return say(['아 재미없어요','형 진짜ㅋㅋ'],'teased');
 if(p==='jaehyeon'&&/언제부터.*(알았|눈치)|언제.*눈치챘/.test(s))return say(['좀 됐지ㅋㅋㅋㅋ','너 생각보다 티 많이 나'],'noticed');
 if(/밥먹|밥은|식사했/.test(s))return say(p==='seongho'?['먹었어','재현이가 졸라서 같이 먹었지']:p==='woonhak'?['먹었죠','형은 먹었어요?']:p==='donghyeon'?['아직','너는? 같이 먹게?']:p==='jaehyeon'?['성호랑 먹었지ㅋㅋㅋㅋ','걔가 먹을 사람 없대서']:['먹었지','동민이 너도 끼니 챙겨'],'meal');
 if(/과제.*(했|끝|냈|어때)|과제는/.test(s))return say(p==='woonhak'?['아직 하고 있어요','형은 다 했어요?']:p==='donghyeon'?['아직','하기 싫다']:p==='seongho'?['나는 끝냈어','너는 과제 끝냈고?']:['거의 다 했어','너는 끝났어?'],'assignment');
 if(/어디야|어디있|어딘데/.test(s))return say(p==='donghyeon'?['인문관 앞','벤치에 앉아있어']:p==='woonhak'?['학교에 있어요','왜요 형?']:p==='jaehyeon'?['나 학교ㅋㅋ','왜 찾냐']:p==='seongho'?['학교야','무슨 일 있어?']:['학교 근처야','동민이 너는 어디야?'],'location');
 return replyBeforeLatest(name,text,c);
};
for(const c of social.dm)if(['hyeon.02','yoon.zip','june.wav'].includes(c.name))c.read=false;
const batteryStarted=Date.now();function drainBattery(){const n=Math.max(0,65-Math.floor((Date.now()-batteryStarted)/60000));PHONE.battery=n;for(const b of document.querySelectorAll('.battery')){b.textContent=n;b.style.background=`linear-gradient(90deg,${n<=20?'#ff453a':'#fff'} ${n}%,#ffffff35 ${n}%)`;b.setAttribute('aria-label',`배터리 ${n}%`);}}setInterval(drainBattery,1000);drainBattery();
const oldMessageHTMLLatest=chatMessageHTML;
chatMessageHTML=function(type,c){const box=document.createElement('div');box.innerHTML=oldMessageHTMLLatest(type,c);const rows=box.querySelectorAll('.socialbubble');c.messages.forEach((m,i)=>{const next=c.messages[i+1];if(!next)return;const sameSender=!!m.out===!!next.out&&(m.out||(m.sender||c.name)===(next.sender||c.name));const a=new Date(m.ts||Date.now()),b=new Date(next.ts||Date.now());if(sameSender&&Math.floor(+a/60000)===Math.floor(+b/60000))rows[i]?.querySelector('small')?.remove();});return box.innerHTML;};
const gptQueues=new Map();sendChat=function(i){const input=$('#chatInput'),t=input?.value.trim();if(!t)return;input.value='';CHATS[i].messages.push(['u',t]);paintGptLatest(i);let q=gptQueues.get(i);if(!q){q=[];gptQueues.set(i,q);}q.push(Math.random()<.5?'너 남의 핸드폰으로 뭐하는거야?':'핸드폰 주인이 아니네');if(q.length===1)emitGptLatest(i);};
function paintGptLatest(i){if(!$('#chatInput')||!$('.chatmessages .chattitle')||$('.chatmessages .chattitle').textContent!==CHATS[i].title)return;const stack=NAVSTACK.slice();chat(i);NAVSTACK=stack;const box=$('.chatmessages');box.scrollTop=box.scrollHeight;box.querySelector('.message:last-of-type')?.animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:220});}
function emitGptLatest(i){setTimeout(()=>{const q=gptQueues.get(i);if(!q?.length)return;CHATS[i].messages.push(['a',q.shift()]);paintGptLatest(i);if(q.length)emitGptLatest(i);},850);}

function musicScreen() {
 const body=shell('음악',true); panel.classList.add('music-player');
 const previous='<svg viewBox="0 0 32 32"><path d="M4 5h3v22H4zM16 5v22L7 16zm12 0v22L17 16z" fill="currentColor"/></svg>';
 const next='<svg viewBox="0 0 32 32"><path d="M25 5h3v22h-3zM16 5v22l9-11zM4 5v22l11-11z" fill="currentColor"/></svg>';
 body.innerHTML=`<div class="player-handle"></div><img class="player-cover" src="${$('.cover').src}" alt="Oasis 앨범"><div class="player-heading"><h2>Champagne Supernova</h2><p>Oasis</p></div><input id="player-seek" aria-label="재생 위치" type="range" min="0" max="447" value="${seconds}"><div class="player-times"><span id="player-elapsed"></span><span id="player-remaining"></span></div><div class="player-buttons"><button id="player-previous" aria-label="이전 곡">${previous}</button><button id="player-toggle" aria-label="재생 또는 일시정지"></button><button id="player-next" aria-label="다음 곡">${next}</button></div><div class="player-volume"><svg viewBox="0 0 24 24"><path d="M3 9h4l5-5v16l-5-5H3z" fill="currentColor"/><path d="M16 8q5 4 0 8" fill="none" stroke="currentColor" stroke-width="2"/></svg><input id="player-volume" aria-label="음량" type="range" min="0" max="100" value="${Math.round(songAudio10.volume*100)}"><span id="player-volume-number">${Math.round(songAudio10.volume*100)}</span></div><div class="player-footer"><span>SONOS</span><button id="player-list" aria-label="재생 목록">☷</button></div><div id="player-queue" hidden>Champagne Supernova — Oasis<br><small>등록된 곡은 한 곡입니다</small></div><label class="audio-load10">음원 파일 선택<input type="file" accept="audio/*" onchange="loadSong10(this)"><small>음원은 포함되어 있지 않아요</small></label>`;
 const seek=$('#player-seek'); seek.oninput=()=>{seconds=+seek.value;if(songAudio10.src)songAudio10.currentTime=seconds;updateMusicPlayer();};
 $('#player-toggle').onclick=()=>{$('#play').click();updateMusicPlayer();};
 const restart=()=>{seconds=0;if(songAudio10.src)songAudio10.currentTime=0;updateMusicPlayer();};
 $('#player-previous').onclick=restart;$('#player-next').onclick=restart;
 $('#player-volume').oninput=e=>{songAudio10.volume=+e.target.value/100;$('#player-volume-number').textContent=e.target.value;e.target.style.setProperty('--fill',e.target.value+'%');};
 $('#player-list').onclick=()=>{$('#player-queue').hidden=!$('#player-queue').hidden;};
 updateMusicPlayer();
}
function updateMusicPlayer(){if(!$('#player-seek'))return;$('#player-seek').value=seconds;$('#player-seek').style.setProperty('--fill',seconds/447*100+'%');$('#player-elapsed').textContent=fmt(seconds);$('#player-remaining').textContent='−'+fmt(Math.max(0,447-seconds));$('#player-toggle').innerHTML=playing?PLAYER_ICONS.pause:PLAYER_ICONS.play;}
setInterval(updateMusicPlayer,500);