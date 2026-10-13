import { Level } from '../types/game';

export const CHAPTER_1_LEVELS: Level[] = [
  {
    id: 1,
    slug: 'ancient-terminal',
    chapter: 1,
    title: 'The Ancient Terminal',
    subtitle: 'The First Spark of Syntax',
    conceptName: 'C Program Structure & printf()',
    conceptSummary:
      'প্রতিটি সি (C) প্রোগ্রামের যাত্রা শুরু হয় main() ফাংশন দিয়ে। <stdio.h> হেডার ফাইলের printf() ফাংশন ব্যবহার করে স্ক্রিনে যেকোনো বার্তা প্রদর্শন করা হয়।',
    xpReward: 100,
    objective: 'টার্মিনাল সক্রিয় করার বার্তাটি কনসোলে প্রদর্শন করো: WELCOME CODE KEEPER প্রিন্ট করো।',
    requirements: [
      'স্ট্যান্ডার্ড ইনপুট/আউটপুট হেডার যুক্ত করো: #include <stdio.h>',
      'প্রোগ্রামের প্রবেশদ্বার ফাংশন লেখো: int main()',
      'স্ক্রিনে টেক্সট প্রিন্ট করার জন্য printf() ব্যবহার করো: WELCOME CODE KEEPER',
      'প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন ; দিতে ভুলবে না',
      'সফল এক্সিকিউশন বোঝাতে main() এর শেষে return 0; দাও',
    ],
    starterCode: `// CHAPTER 1 - LEVEL 1: THE ANCIENT TERMINAL
// Objective: Speak the ancient greeting to unlock the chamber.
// Required Output: WELCOME CODE KEEPER

#include <stdio.h>

int main() {
    // Write your code below to display the greeting:
    
    return 0;
}
`,
    solutionExample: `#include <stdio.h>

int main() {
    printf("WELCOME CODE KEEPER\\n");
    return 0;
}
`,
    hints: [
      {
        id: 1,
        title: 'কোড লেখার অবস্থান',
        content: 'তোমার কোডটি int main() এর দ্বিতীয় বন্ধনী { ... } এর ভেতর এবং return 0; এর ঠিক উপরে লেখো।',
      },
      {
        id: 2,
        title: 'printf() এর সঠিক ব্যবহার',
        content: 'সি ভাষায় যেকোনো টেক্সট প্রিন্ট করতে ডাবল কোটেশন চিহ্নের ভেতরে লিখতে হয়: printf("YOUR_TEXT_HERE\\n");',
      },
      {
        id: 3,
        title: 'সরাসরি সিনট্যাক্স ব্লুপ্রিন্ট',
        content: 'হুবহু এই লাইনটি কোডের মধ্যে বসাও এবং শেষে সেমিকোলনটি নিশ্চিত করো:',
        codeSnippet: 'printf("WELCOME CODE KEEPER\\n");',
      },
    ],
    storyIntro: [
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'স্বাগতম, নির্ভীক অভিযাত্রী! আমি আরিয়া (ARIA)—প্রাচীন জ্ঞানকোষের কৃত্রিম বুদ্ধিমত্তা সহায়ক। তুমি এখন দাঁড়িয়ে আছো প্রাচীন প্রথম কোড কিপারদের প্রবেশদ্বারে।',
      },
      {
        speaker: 'Terminal Node',
        role: 'terminal',
        text: '[সিস্টেম নিষ্ক্রিয় // স্বীকৃতি বার্তা অনুপস্থিত: "WELCOME CODE KEEPER"]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'এই প্রাচীন টার্মিনালটি সি (C) প্রোগ্রামিং ভাষা বোঝে। printf() ফাংশন ব্যবহার করে টার্মিনালকে স্বাগতম জানাও, যাতে দরজার হাইড্রোলিক লকটি খুলে যায়।',
      },
    ],
    storySuccess: [
      {
        speaker: 'Terminal Node',
        role: 'terminal',
        text: '[সিনট্যাক্স যাচাই সফল: WELCOME CODE KEEPER // হাইড্রোলিক লক আনলক হচ্ছে...]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'অসাধারণ! টার্মিনালে নীল আলো জ্বলে উঠেছে। প্রাচীন পাথরের ভারী দরজা সরে গিয়ে নিচের করিডোরের পথ খুলে গেছে।',
      },
    ],
    testCases: [
      {
        id: 'l1-t1',
        name: 'Terminal Greeting Check',
        description: 'যাচাই করে যে টার্মিনালটি হুবহু "WELCOME CODE KEEPER" বার্তাটি গ্রহণ করেছে কিনা',
        expectedOutput: /WELCOME CODE KEEPER/i,
        displayExpected: 'WELCOME CODE KEEPER',
      },
    ],
  },
  {
    id: 2,
    slug: 'dead-power-core',
    chapter: 1,
    title: 'The Dead Power Core',
    subtitle: 'Allocating Memory & Variables',
    conceptName: 'Integer Variables & Format Specifiers (%d)',
    conceptSummary:
      'সি প্রোগ্রামে মেমরিতে সংখ্যা বা তথ্য জমা রাখতে ভ্যারিয়েবল ব্যবহৃত হয়। পূর্ণসংখ্যার জন্য int এবং printf-এ সেই মান প্রদর্শনের জন্য %d স্পেসিফায়ার ব্যবহার করতে হয়।',
    xpReward: 150,
    objective: 'একটি ইন্টিজার ভ্যারিয়েবলে ১০০ পাওয়ার ইউনিট সংরক্ষণ করো এবং কোরের স্ক্রিনে প্রদর্শন করো।',
    requirements: [
      'int দিয়ে একটি ইন্টিজার ভ্যারিয়েবল ডিক্লেয়ার করো (যেমন: int power = 100;)',
      'ভ্যারিয়েবলে মান হিসেবে ১০০ (100) নির্ধারণ করো',
      'ভ্যারিয়েবলের মান প্রদর্শন করতে printf("%d\\n", power); ব্যবহার করো',
      'main() এর শেষে return 0; দাও',
    ],
    starterCode: `// CHAPTER 1 - LEVEL 2: THE DEAD POWER CORE
// Objective: Store 100 units in an integer variable and display it.
// Required Output: 100 (or Power: 100)

#include <stdio.h>

int main() {
    // 1. Declare an integer variable and assign it 100
    
    // 2. Print the variable using the %d format specifier
    
    return 0;
}
`,
    solutionExample: `#include <stdio.h>

int main() {
    int power = 100;
    printf("%d\\n", power);
    return 0;
}
`,
    hints: [
      {
        id: 1,
        title: 'ইন্টিজার ভ্যারিয়েবল তৈরি করা',
        content: 'সি ভাষায় পূর্ণসংখ্যা সংরক্ষণ করতে int টাইপ ব্যবহার করো: int variableName = 100;',
      },
      {
        id: 2,
        title: '%d ফরম্যাট স্পেসিফায়ার',
        content: 'printf এ সংখ্যার মান বসাতে %d প্লেসহোল্ডার ব্যবহৃত হয়: printf("%d\\n", power);। এখানে %d এর জায়গায় ভ্যারিয়েবলের মানটি দেখাবে।',
      },
      {
        id: 3,
        title: 'সম্পূর্ণ সিনট্যাক্স কাঠামো',
        content: 'int power = 100; লিখে নিচে printf("%d\\n", power); লেখো। সেমিকোলন দিতে ভুলবে না!',
        codeSnippet: 'int power = 100;\nprintf("%d\\n", power);',
      },
    ],
    storyIntro: [
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'সামনে তাকাও—করিডোরের মূল পাওয়ার কোরটি নিভে গেছে। ম্যাগনেটিক ফিল্ড সম্পূর্ণ খালি হয়ে গেছে।',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'পাওয়ার কোরকে পুনরায় সচল করতে ঠিক ১০০ ইউনিট শক্তি বরাদ্দ করতে হবে। একটি ইন্টিজার ভ্যারিয়েবল তৈরি করে এর মান কোরের সিস্টেমে পাঠাও।',
      },
      {
        speaker: 'Terminal Node',
        role: 'terminal',
        text: '[কোর স্ট্যাটাস: ০ / ১০০ ইউনিট // ইন্টিজার টেলিমিতির অপেক্ষায়]',
      },
    ],
    storySuccess: [
      {
        speaker: 'Terminal Node',
        role: 'terminal',
        text: '[টেলিমিতি গৃহীত: ১০০ ইউনিট // ম্যাগনেটিক ফিল্ড স্থিতিশীল]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'ক্রিস্টাল কোরটি উজ্জ্বল নীল আলোয় জ্বলতে শুরু করেছে! শক্তি এখন পাইপলাইন দিয়ে চারপাশের মেশিনগুলোতে প্রবাহিত হচ্ছে।',
      },
    ],
    testCases: [
      {
        id: 'l2-t1',
        name: 'Core Charge Value',
        description: 'যাচাই করে যে কোরে ১০০ পাওয়ার ইউনিট সঠিকভাবে প্রেরিত ও প্রদর্শিত হয়েছে',
        expectedOutput: /\b100\b/,
        displayExpected: '100',
      },
    ],
  },
  {
    id: 3,
    slug: 'broken-generator',
    chapter: 1,
    title: 'The Broken Generator',
    subtitle: 'Combining Energy with Arithmetic',
    conceptName: 'Arithmetic Operators (+, -, *, /) & Expressions',
    conceptSummary:
      'সি ভাষায় গাণিতিক অপারেটর (যেমন +) ব্যবহার করে একাধিক ভ্যারিয়েবলের যোগফল নির্ণয় করে নতুন মান তৈরি করা যায়।',
    xpReward: 200,
    objective: '৪০ ও ৬০ ইউনিট ধারণকারী দুটি এনার্জি সেল যোগ করে মোট শক্তি (১০০) জেনারেটরে সরবরাহ করো।',
    requirements: [
      'দুটি ইন্টিজার ভ্যারিয়েবল তৈরি করে 40 এবং 60 মান রাখো (যেমন: int cellA = 40; int cellB = 60;)',
      '+ অপারেটর ব্যবহার করে যোগফল নির্ণয় করো',
      'যোগফল (100) স্ক্রিনে %d দিয়ে প্রিন্ট করো',
    ],
    starterCode: `// CHAPTER 1 - LEVEL 3: THE BROKEN GENERATOR
// Objective: Combine the energy from two reserve cells (40 and 60 units).
// Required Output: 100

#include <stdio.h>

int main() {
    // Cell A holds 40 units
    // Cell B holds 60 units
    // Combine them and print the total:
    
    return 0;
}
`,
    solutionExample: `#include <stdio.h>

int main() {
    int cellA = 40;
    int cellB = 60;
    int total = cellA + cellB;
    printf("%d\\n", total);
    return 0;
}
`,
    hints: [
      {
        id: 1,
        title: 'দুটি ভ্যারিয়েবল রাখা',
        content: 'দুটি সেল সংরক্ষণ করতে দুটি ভ্যারিয়েবল লেখো: int cellA = 40; এবং int cellB = 60;',
      },
      {
        id: 2,
        title: 'যোগফল নির্ণয় করা',
        content: 'তৃতীয় একটি ভ্যারিয়েবলে যোগফল রাখো: int total = cellA + cellB; অথবা সরাসরি printf-এর ভেতরেও যোগ করতে পারো।',
      },
      {
        id: 3,
        title: 'যোগফল আউটপুটে দেখানো',
        content: 'printf("%d\\n", total); ব্যবহার করে যোগফল প্রিন্ট করো।',
        codeSnippet: 'int cellA = 40;\nint cellB = 60;\nint total = cellA + cellB;\nprintf("%d\\n", total);',
      },
    ],
    storyIntro: [
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'আমরা টারবাইন জংশনে পৌঁছেছি, কিন্তু মূল জেনারেটর বন্ধ হয়ে আছে। এটি ঘোরাতে ১০০ ইউনিট শক্তি প্রয়োজন।',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'একক কোনো সেলে পর্যাপ্ত শক্তি নেই: সেল এ-তে আছে ৪০ ইউনিট এবং সেল বি-তে আছে ৬০ ইউনিট। আমাদের গাণিতিক যোগের মাধ্যমে দুটিকে একত্র করতে হবে!',
      },
      {
        speaker: 'Generator Cog',
        role: 'terminal',
        text: '[জেনারেটর বন্ধ // প্রয়োজনীয় ন্যূনতম শক্তি: ১০০ ইউনিট]',
      },
    ],
    storySuccess: [
      {
        speaker: 'Generator Cog',
        role: 'terminal',
        text: '[সার্কিট সক্রিয়: ৪০ + ৬০ = ১০০ ইউনিট // টারবাইন ঘূর্ণন শুরু হয়েছে]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'ভারী টারবাইন চাকাগুলো প্রচণ্ড বেগে ঘুরতে শুরু করেছে! পুরো চেম্বারের বিদ্যুৎ গ্রিড পুনরায় সক্রিয় হলো।',
      },
    ],
    testCases: [
      {
        id: 'l3-t1',
        name: 'Combined Energy Output',
        description: 'যাচাই করে যে ৪০ এবং ৬০ যোগ করে আউটপুটে ১০০ পাওয়া গেছে কিনা',
        expectedOutput: /\b100\b/,
        displayExpected: '100',
      },
    ],
  },
  {
    id: 4,
    slug: 'sleeping-guardian',
    chapter: 1,
    title: 'The Sleeping Guardian',
    subtitle: 'Decisions in Silicon',
    conceptName: 'Comparison Operators (>=) & if-else Statements',
    conceptSummary:
      'if-else স্টেটমেন্ট প্রোগ্রামকে যৌক্তিক সিদ্ধান্ত নিতে সাহায্য করে। যদি কোনো শর্ত (যেমন energy >= 50) সত্য হয় তবে if ব্লক চলবে, অন্যথায় else ব্লক কার্যকর হবে।',
    xpReward: 250,
    objective:
      'রোবটের শক্তি ইনপুট হিসেবে নাও। যদি শক্তি কমপক্ষে ৫০ (>= 50) হয়, তবে "Guardian Online" প্রিন্ট করো; অন্যথায় "Insufficient Energy" প্রিন্ট করো।',
    requirements: [
      'ইনপুট থেকে সংখ্যা পড়তে scanf("%d", &energy); ব্যবহার করো',
      'if (energy >= 50) শর্ত প্রয়োগ করো',
      'শর্ত সত্য হলে "Guardian Online" প্রিন্ট করো',
      'শর্ত মিথ্যা হলে "Insufficient Energy" প্রিন্ট করো',
    ],
    starterCode: `// CHAPTER 1 - LEVEL 4: THE SLEEPING GUARDIAN
// Objective: Wake the ancient sentinel if provided energy is at least 50.
// Input: An integer representing energy level.
// If energy >= 50: print "Guardian Online"
// Otherwise: print "Insufficient Energy"

#include <stdio.h>

int main() {
    int energy;
    scanf("%d", &energy);
    
    // Write your if-else logic here:
    
    return 0;
}
`,
    solutionExample: `#include <stdio.h>

int main() {
    int energy;
    if (scanf("%d", &energy) == 1) {
        if (energy >= 50) {
            printf("Guardian Online\\n");
        } else {
            printf("Insufficient Energy\\n");
        }
    }
    return 0;
}
`,
    hints: [
      {
        id: 1,
        title: 'তুলনামূলক অপারেটর (>=)',
        content: 'সি ভাষায় "কমপক্ষে ৫০" মানে ৫০ বা তার বেশি: energy >= 50 লিখতে হয়।',
      },
      {
        id: 2,
        title: 'if-else এর গঠন',
        content: 'নিয়ম অনুযায়ী লেখো:\nif (energy >= 50) {\n    printf("Guardian Online\\n");\n} else {\n    printf("Insufficient Energy\\n");\n}',
      },
      {
        id: 3,
        title: 'হুবহু টেক্সট মেলানো',
        content: 'আউটপুটের টেক্সট যেন হুবহু মিলে: "Guardian Online" এবং "Insufficient Energy"।',
        codeSnippet: 'if (energy >= 50) {\n    printf("Guardian Online\\n");\n} else {\n    printf("Insufficient Energy\\n");\n}',
      },
    ],
    storyIntro: [
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'সাইলেন্ট গেটের প্রধান দরজার সামনে একটি বিশালাকার রোবট সেন্টিনেল পাহারা দিচ্ছে। এর অপটিক্যাল চোখ দুটো অন্ধকার।',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'এর সুরক্ষা কোড অনুসারে, রোবটটিকে জাগাতে কমপক্ষে ৫০ ইউনিট শক্তি থাকতে হবে। শক্তি কম হলে এটি "Insufficient Energy" সতর্কতা দেবে।',
      },
      {
        speaker: 'Sentinel Chassis',
        role: 'terminal',
        text: '[গোলেম প্রোটোকল: সুপ্তাবস্থা // শক্তি ইনপুট টেলিমিতির প্রতীক্ষায়]',
      },
    ],
    storySuccess: [
      {
        speaker: 'Sentinel Chassis',
        role: 'terminal',
        text: '[অপটিক্স সক্রিয় // GUARDIAN ONLINE // কোড কিপারকে অভিবাদন]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'সেন্টিনেলের চোখ পান্না-সবুজ আলোয় জ্বলে উঠেছে! সে তার বিশাল ধাতব হাত তুলে স্যালুট জানিয়ে সাইলেন্ট গেটের পথ উন্মুক্ত করে দিল।',
      },
    ],
    testCases: [
      {
        id: 'l4-t1',
        name: 'Sufficient Energy (75)',
        description: '৭৫ শক্তি (>= ৫০) সরবরাহ করলে রোবট জাগ্রত হবে ("Guardian Online")',
        stdin: '75',
        expectedOutput: /Guardian Online/i,
        displayExpected: 'Guardian Online',
      },
      {
        id: 'l4-t2',
        name: 'Insufficient Energy (30)',
        description: '৩০ শক্তি (< ৫০) সরবরাহ করলে কম শক্তির সতর্কতা দেখাবে ("Insufficient Energy")',
        stdin: '30',
        expectedOutput: /Insufficient Energy/i,
        displayExpected: 'Insufficient Energy',
      },
      {
        id: 'l4-t3',
        name: 'Boundary Threshold (50)',
        description: 'ঠিক ৫০ শক্তিও "কমপক্ষে ৫০" শর্তটি পূরণ করে ("Guardian Online")',
        stdin: '50',
        expectedOutput: /Guardian Online/i,
        displayExpected: 'Guardian Online',
      },
    ],
  },
  {
    id: 5,
    slug: 'silent-gate',
    chapter: 1,
    title: 'The Silent Gate — Boss Level',
    subtitle: 'The Final Trial of Chapter 1',
    conceptName: 'Interactive Input (scanf), Variables & Multi-Condition Logic',
    conceptSummary:
      'আসল প্রোগ্রাম ইনপুট নিয়ে কাজ করে। scanf("%d", &variable) ব্যবহার করে ব্যবহারকারীর ইনপুট মেমরিতে রাখা হয়। এরপর if (code == 1289) দিয়ে সিস্টেমের প্রবেশাধিকার নিয়ন্ত্রণ করা হয়।',
    xpReward: 350,
    objective:
      'ইনপুট থেকে একটি ইন্টিজার অ্যাক্সেস কোড গ্রহণ করো। কোডটি 1289 হলে "Gate Opened" প্রিন্ট করো; অন্যথায় "Access Denied" প্রিন্ট করো।',
    requirements: [
      'অ্যাক্সেস কোড রাখার জন্য একটি int ভ্যারিয়েবল ডিক্লেয়ার করো',
      'ইনপুট রিড করতে scanf("%d", &code) ব্যবহার করো (অ্যান্ড & চিহ্ন আবশ্যক)',
      'সমতা যাচাই করার জন্য == ব্যবহার করো (যেমন: if (code == 1289))',
      'কোড ১২৮৯ হলে "Gate Opened" প্রিন্ট করো',
      'অন্য যেকোনো ভুল বা শূন্য কোডের জন্য "Access Denied" প্রিন্ট করো',
    ],
    starterCode: `// CHAPTER 1 - BOSS LEVEL: THE SILENT GATE
// Objective: Read an integer access code from input.
// If the code is 1289: print "Gate Opened"
// Otherwise: print "Access Denied"

#include <stdio.h>

int main() {
    int code;
    // 1. Read the access code from input
    
    // 2. Evaluate the code and print the result
    
    return 0;
}
`,
    solutionExample: `#include <stdio.h>

int main() {
    int code;
    if (scanf("%d", &code) == 1) {
        if (code == 1289) {
            printf("Gate Opened\\n");
        } else {
            printf("Access Denied\\n");
        }
    }
    return 0;
}
`,
    hints: [
      {
        id: 1,
        title: 'scanf() এ ইনপুট গ্রহণ ও & এর ব্যবহার',
        content: 'ইনপুট নেওয়ার সময় ভ্যারিয়েবলের নামের আগে অ্যান্ড (&) দিতে ভুলবে না: scanf("%d", &code);। & ভুলে গেলে মেমরি এরর বা সেগমেন্টেশন ফল্ট হয়!',
      },
      {
        id: 2,
        title: 'সমতা বনাম অ্যাসাইনমেন্ট (==)',
        content: 'সি ভাষায় দুটি মান সমান কিনা তা যাচাই করতে ডাবল ইকুয়াল == ব্যবহার করা হয়: if (code == 1289)। একটি ইকুয়াল = দিয়ে মান নির্ধারণ করা হয়।',
      },
      {
        id: 3,
        title: 'বস লেভেলের পূর্ণাঙ্গ লজিক',
        content: 'scanf("%d", &code); দিয়ে পড়ে if-else দিয়ে যাচাই করো:',
        codeSnippet: 'int code;\nscanf("%d", &code);\nif (code == 1289) {\n    printf("Gate Opened\\n");\n} else {\n    printf("Access Denied\\n");\n}',
      },
    ],
    storyIntro: [
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'অবশেষে আমরা পৌঁছে গেছি... দ্য সাইলেন্ট গেট! দীর্ঘ দশ হাজার চক্র ধরে কোনো মানুষ এই দুর্ভেদ্য গেট পার হতে পারেনি।',
      },
      {
        speaker: 'Silent Gate Cipher',
        role: 'terminal',
        text: '[আর্কাইভ সাইফার সক্রিয়: সাইলেন্ট গেট উন্মুক্ত করতে ৪-সংখ্যার গোপন পাসকোড ইনপুট দিন]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'চেম্বারের দেওয়ালে প্রাচীন সংকেতটি খোদাই করা আছে: ১২৮৯ (1289)। scanf() ব্যবহার করে কোডটি রিড করো এবং গেটটি খুলে দাও!',
      },
    ],
    storySuccess: [
      {
        speaker: 'Silent Gate Cipher',
        role: 'terminal',
        text: '[পাসকোড সঠিক: ১২৮৯ // হাইড্রোলিক লক প্রত্যাহার করা হচ্ছে // GATE OPENED]',
      },
      {
        speaker: 'Aria',
        role: 'aria',
        text: 'অবিশ্বাস্য! বিশালাকার মনোলিথ গেটটি কেঁপে উঠেছে। চারপাশের ভারী চারটি লক সরে গিয়ে দ্বিতীয় চ্যাপ্টারের মহাজাগতিক পথ উন্মোচিত হলো!',
      },
    ],
    testCases: [
      {
        id: 'l5-t1',
        name: 'Valid Keycode (1289)',
        description: 'সঠিক পাসকোড ১২৮৯ দিলে গেট উন্মুক্ত হবে ("Gate Opened")',
        stdin: '1289',
        expectedOutput: /Gate Opened/i,
        displayExpected: 'Gate Opened',
      },
      {
        id: 'l5-t2',
        name: 'Invalid Intruder Code (9999)',
        description: 'অননুমোদিত ভুল কোড ৯৯৯৯ দিলে অ্যাক্সেস বাতিল হবে ("Access Denied")',
        stdin: '9999',
        expectedOutput: /Access Denied/i,
        displayExpected: 'Access Denied',
      },
      {
        id: 'l5-t3',
        name: 'Zero Input Edge Case (0)',
        description: 'শূন্য (০) কোডের ক্ষেত্রেও নিরাপদভাবে "Access Denied" প্রদর্শন করবে',
        stdin: '0',
        expectedOutput: /Access Denied/i,
        displayExpected: 'Access Denied',
      },
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_spark',
    title: 'First Spark',
    description: 'আপনার প্রথম printf() কল দিয়ে প্রাচীন টার্মিনালকে জাগ্রত করেছেন।',
    icon: 'Terminal',
  },
  {
    id: 'power_engineer',
    title: 'Power Engineer',
    description: 'ভ্যারিয়েবল মেমরি বরাদ্দ করে ডেড পাওয়ার কোরে আলো জ্বালিয়েছেন।',
    icon: 'Zap',
  },
  {
    id: 'plasma_synergy',
    title: 'Plasma Synergy',
    description: 'গাণিতিক অপারেটর ব্যবহার করে শক্তি সেল যোগ করে টারবাইন চালু করেছেন।',
    icon: 'Cpu',
  },
  {
    id: 'sentinel_whisperer',
    title: 'Sentinel Whisperer',
    description: 'if-else লজিক আয়ত্ত করে ঘুমন্ত সেন্টিনেল রোবটকে জাগ্রত করেছেন।',
    icon: 'Shield',
  },
  {
    id: 'gatebreaker',
    title: 'Gatebreaker of Antiquity',
    description: 'বস লেভেল জয় করে সাইলেন্ট গেট চিরতরে উন্মুক্ত করেছেন।',
    icon: 'Key',
  },
  {
    id: 'clean_coder',
    title: 'Flawless Compilation',
    description: 'কোনো কম্পাইলার ত্রুটি ছাড়াই প্রথম প্রচেষ্টায় সবগুলো টেস্ট কেস পাস করেছেন।',
    icon: 'Award',
  },
];
