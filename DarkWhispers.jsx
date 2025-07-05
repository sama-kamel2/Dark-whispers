import { useState, useEffect } from "react";
// import useSound from 'use-sound';
// import creepySound from './assets/creepy.mp3';

const characters = [
  {
    name: "نادر",
    role: "مهندس ذكاء صناعي",
    img: "https://via.placeholder.com/150?text=نادر",
    info: "مشروعه رُفض من الضحية، ويبدو عليه الهدوء الزائد."
  },
  {
    name: "سارة",
    role: "مبرمجة حرة",
    img: "https://via.placeholder.com/150?text=سارة",
    info: "كانت على خلاف مالي مع الضحية، لكنها تدّعي أنها كانت نائمة."
  },
  {
    name: "فادي",
    role: "رجل أمن",
    img: "https://via.placeholder.com/150?text=فادي",
    info: "كان يتلقى تهديدًا من الضحية بعد مشادة حصلت بينهم قبل أسبوع."
  },
  {
    name: "منى",
    role: "ممثلة",
    img: "https://via.placeholder.com/150?text=منى",
    info: "عُرفت بعلاقة غامضة مع الضحية، وكانت منهارة عند اكتشاف الجثة."
  },
  {
    name: "سامي",
    role: "هاكر سابق",
    img: "https://via.placeholder.com/150?text=سامي",
    info: "له ماضٍ مظلم، وتم ابتزازه من قبل الضحية بمعلومات قديمة."
  },
  {
    name: "ليلى",
    role: "مديرة أعمال",
    img: "https://via.placeholder.com/150?text=ليلى",
    info: "تم طردها مؤخرًا من قبل الضحية، وكانت غاضبة منه."
  }
];

export default function DarkWhispers() {
  const [teamName, setTeamName] = useState("");
  const [language, setLanguage] = useState("ar");
  const [started, setStarted] = useState(false);
  const [challenge1Answer, setChallenge1Answer] = useState("");
  const [challenge1Solved, setChallenge1Solved] = useState(false);
  const [challenge2Answer, setChallenge2Answer] = useState("");
  const [challenge2Solved, setChallenge2Solved] = useState(false);
  const [challenge3Answer, setChallenge3Answer] = useState("");
  const [challenge3Solved, setChallenge3Solved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const play = () => {}; // تم تعطيل الصوت مؤقتًا

  const t = {
    ar: {
      title: "همسات الظلام",
      start: "ابدأ التحقيق",
      enterTeam: "ادخل اسم الفريق",
      intro: "في ليلة شتوية ممطرة... توقف القطار فجأة. في الكابينة الرابعة، اكتُشف جسد هامد. القاتل بيننا، والمهمة الآن هي اكتشافه قبل وصول الشرطة!",
      characters: "المشتبهون",
      challenge1: "🧩 التحدي الأول - C++",
      challenge1Question: "اكتب برنامج C++ يقرأ log.json ويطبع أسماء الأشخاص الذين دخلوا الكابينة رقم 4، ثم أدخل الناتج هنا:",
      challenge2: "🧩 التحدي الثاني - C#",
      challenge2Question: "تم العثور على جملة مشفّرة: Kxvhu lv wkh nlfohu. استخدم Caesar Cipher لإزاحة 3، ثم أدخل الناتج:",
      challenge3: "🧩 التحدي الثالث - تحليل منطقي",
      challenge3Question: "شخصان لا يمكن أن يكونا في نفس المكان، لكن يظهران معًا في السجلات. من هما؟",
      submit: "تحقق",
      correct: "✅ صحيح! الدليل:",
      clue1: "log.json: Mona, Nader, Laila",
      clue2: "User is the killer",
      clue3: "منى وسامي ظهروا في نفس الوقت، لكن سامي كان في الطرف الآخر من القطار!"
    }
  };

  const lang = t[language];

  useEffect(() => {
    if (started) play();
  }, [started]);

  useEffect(() => {
    if (!started || challenge3Solved) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ انتهى الوقت!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (!started) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4 p-6">
      <h1 className="text-4xl font-bold">{lang.title}</h1>
      <p className="max-w-xl text-center">{lang.intro}</p>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder={lang.enterTeam} className="text-black p-2 rounded" />
      <button onClick={() => teamName && setStarted(true)} className="bg-red-600 px-4 py-2 rounded">{lang.start}</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-10">
      {!challenge3Solved && (
        <div className="fixed top-4 right-4 bg-black px-4 py-2 rounded shadow text-red-400 text-lg">
          ⏳ {formatTime(timeLeft)}
        </div>
      )}

      {challenge3Solved && (
        <div className="fixed inset-0 bg-black bg-opacity-90 text-center flex flex-col items-center justify-center z-50 text-white">
          <h1 className="text-4xl font-bold mb-6">🎉 النهاية!</h1>
          <p className="text-xl mb-4">القاتل هو <span className="text-red-400 font-bold">سامي</span>، وقد اعترف بجريمته بعد مواجهته بالأدلة!</p>
          <p className="text-green-400">مبروك لفريق <span className="underline">{teamName}</span> على حل القضية بنجاح.</p>
        </div>
      )}

      <h2 className="text-2xl font-bold">{lang.characters}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {characters.map((char, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-xl text-center hover:bg-gray-700">
            <img src={char.img} alt={char.name} className="mx-auto rounded-full mb-2" />
            <h3 className="text-xl font-bold">{char.name}</h3>
            <p className="italic text-red-300">{char.role}</p>
            <p className="text-sm mt-1">{char.info}</p>
          </div>
        ))}
      </div>

      {/* Challenge 1 */}
      <div>
        <h2 className="text-xl font-bold">{lang.challenge1}</h2>
        <p>{lang.challenge1Question}</p>
        <input className="text-black p-2 rounded w-full max-w-md" value={challenge1Answer} onChange={(e) => setChallenge1Answer(e.target.value)} />
        <button className="bg-blue-700 px-4 py-2 rounded mt-2" onClick={() => {
          if (challenge1Answer.replace(/\s+/g, '').toLowerCase() === "منى,نادر,ليلى") setChallenge1Solved(true);
          else alert("❌ خاطئة. حاول مجددًا.");
        }}>{lang.submit}</button>
        {challenge1Solved && <div className="text-green-400 mt-2">{lang.correct} {lang.clue1}</div>}
      </div>

      {/* Challenge 2 */}
      {challenge1Solved && (
        <div>
          <h2 className="text-xl font-bold">{lang.challenge2}</h2>
          <p>{lang.challenge2Question}</p>
          <input className="text-black p-2 rounded w-full max-w-md" value={challenge2Answer} onChange={(e) => setChallenge2Answer(e.target.value)} />
          <button className="bg-purple-700 px-4 py-2 rounded mt-2" onClick={() => {
            if (challenge2Answer.trim().toLowerCase() === "user is the killer") setChallenge2Solved(true);
            else alert("❌ خاطئة. حاول مجددًا.");
          }}>{lang.submit}</button>
          {challenge2Solved && <div className="text-green-400 mt-2">{lang.correct} {lang.clue2}</div>}
        </div>
      )}

      {/* Challenge 3 */}
      {challenge2Solved && (
        <div>
          <h2 className="text-xl font-bold">{lang.challenge3}</h2>
          <p>{lang.challenge3Question}</p>
          <input className="text-black p-2 rounded w-full max-w-md" value={challenge3Answer} onChange={(e) => setChallenge3Answer(e.target.value)} />
          <button className="bg-yellow-600 px-4 py-2 rounded mt-2" onClick={() => {
            const ans = challenge3Answer.toLowerCase();
            if (ans.includes("منى") && ans.includes("سامي")) setChallenge3Solved(true);
            else alert("❌ خاطئة. حاول مجددًا.");
          }}>{lang.submit}</button>
          {challenge3Solved && <div className="text-green-400 mt-2">{lang.correct} {lang.clue3}</div>}
        </div>
      )}
    </div>
  );
}

