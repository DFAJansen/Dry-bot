function parseChance(input) {
    const s = String(input).replaceAll(",", "").trim();
    if (s.includes("/")) {
      const [a, b] = s.split("/").map(Number);
      if (!isFinite(a) || !isFinite(b) || a <= 0 || b <= 0) return null;
      return a / b;
    }
    const v = Number(s);
    if (!isFinite(v) || v <= 0) return null;
    return v > 1 ? 1 / v : v;
  }
  
  function binomDist(p, n, k) {
    const logPNot = Math.log(1 - p);
    const logPDiff = Math.log(p) - logPNot;
  
    let logPX = n * logPNot; // x=0
    let pCumulative = 0;
  
    for (let x = 1; x <= k; x++) {
      pCumulative += Math.exp(logPX);
      logPX = logPX + Math.log(n - x + 1) - Math.log(x) + logPDiff;
    }
    return [pCumulative, Math.exp(logPX)];
  }
  
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function flavourText(percentMoreThan, obtained) {
    const flavourTexts = [
      {
        min: -1, max: 1,
        any: [
          "You are some sort of sentient water being you're so not-dry. How'd you even do this?",
          "You’re so wet you should bring a bucket to the GE.",
          "Jagex just handed you the drop like it was a quest reward."
        ]
      },
      {
        min: 1, max: 10,
        any: [
          "You're a higher % water than a watermelon.",
          "You’re basically a walking humidifier.",
          "Your RNG is so wet it squeaks."
        ],
        zero: [
          "…Or you would be if you had gotten any drops. But you didn't.",
          "Still zero drops though. Iconic.",
          "Wet energy, dry results."
        ]
      },
      {
        min: 10, max: 20,
        any: [
          "Only ironmen can be this lucky.",
          "This is spooned behaviour.",
          "You’re getting carried by pure RNG."
        ],
        zero: [
          "But you got no drops, so I guess you're not an ironman.",
          "And yet: 0 drops. Respectfully disgusting.",
          "Imagine being this lucky on paper and still empty-handed."
        ]
      },
      {
        min: 20, max: 30,
        any: [
          "🥄 Spooned 🥄",
          "RNG says you’re the main character.",
          "Your loot beam has main-character energy."
        ],
        zero: [
          "j/k you got no drops",
          "…except you’re still at 0. Love that for you.",
          "Spooned? Not today."
        ]
      },
      {
        min: 30, max: 40,
        any: [
          "Your friends will be jealous.",
          "Your group chat is about to get salty.",
          "This is the kind of RNG that ends friendships."
        ],
        zero: [
          "...If you got any drops.",
          "…but your log is still empty, so never mind.",
          "Except: 0 items. Incredible."
        ]
      },
      {
        min: 40, max: 49,
        any: [
          "You're quite the lucker aren't you.",
          "Slight spoon energy detected.",
          "Not bad. Not bad at all."
        ],
        zero: [
          "Or not, since you got no drops.",
          "But you still got nothing. Classic.",
          "Statistically fine, emotionally ruined."
        ]
      },
      {
        min: 49, max: 51,
        any: [
          "A perfect mix of dry and undry, as all things should be.",
          "Perfectly balanced. Perfectly boring.",
          "You are the bell curve incarnate."
        ]
      },
      {
        min: 51, max: 61,
        any: [
          "Nothing interesting happens.",
          "Standard issue RNG. Move along.",
          "This is what 'expected' feels like."
        ],
        zero: [
          "Over half of your friends would have got a drop by now, though.",
          "More than half the lobby would be looting right now.",
          "Most people would’ve hit by now. You? Nah."
        ]
      },
      {
        min: 61, max: 65,
        any: [
          "An unenlightened being would say 'but 1/x over x kills means I should get it', but you know better now.",
          "You now understand probability. Unfortunately.",
          "Welcome to OSRS math. It hurts here."
        ]
      },
      {
        min: 65, max: 73,
        any: [
          "Nothing interesting happens.",
          "Dryness is loading… please wait.",
          "This is where the cope starts."
        ],
        zero: [
          "Not even any drops.",
          "No loot. Just vibes. Bad vibes.",
          "Your drop log is roleplaying as a desert."
        ]
      },
      { min: 73, max: 74, any: ["😂😂😂", "HAHAHAHAHA", "Bro…"] },
      {
        min: 74, max: 85,
        any: [
          "oof",
          "Okay, this is getting spicy.",
          "You’re entering sand territory."
        ]
      },
      {
        min: 85, max: 90,
        any: [
          "A national emergency has been declared in your drop log.",
          "Your loot tab has entered witness protection.",
          "This is how villains are created."
        ]
      },
      {
        min: 90, max: 95,
        any: [
          "Right, time to post on reddit.",
          "Drafting the Reddit post as we speak.",
          "r/2007scape is calling."
        ]
      },
      {
        min: 95, max: 99,
        any: [
          "You after being this dry: 💀",
          "Your account is experiencing extreme dehydration.",
          "Even the desert is like: 'damn'."
        ]
      },
      {
        min: 99, max: 99.5,
        any: [
          "You are so dry you have collapsed into the dry singularity. The dryularity, if you will.",
          "You’ve transcended dryness. You are dryness.",
          "Your RNG has become a cosmic joke."
        ]
      },
      {
        min: 99.5, max: 99.9,
        any: [
          "The vacuum of space has more activity than your drop log.",
          "Your log is quieter than a dead HCIM.",
          "Your loot beam retired early."
        ]
      },
      {
        min: 99.9, max: 99.99,
        any: [
          "Wow that's so rare! Seems like it's bugged. We tweeted @JagexAsh for you...",
          "We’ve opened a support ticket titled: 'bro please'.",
          "This is statistically cursed."
        ]
      },
      {
        min: 99.99, max: 1000,
        any: [
          "Did you forget to talk to Oziach?",
          "Have you tried turning drops off and on again?",
          "At this point, the boss is farming you."
        ]
      }
    ];
  
    for (const tier of flavourTexts) {
      if (percentMoreThan >= tier.min && percentMoreThan < tier.max) {
        const base = pick(tier.any);
        if (obtained === 0 && tier.zero && tier.zero.length) {
          return base + " " + pick(tier.zero);
        }
        return base;
      }
    }
    return "";
  }
  
  function fmtPct(x) {
    if (!isFinite(x)) return "n/a";
    return (x * 100).toFixed(8) + "%";
  }
  function fmtOneIn(x) {
    if (!isFinite(x) || x <= 0) return "n/a";
    const rounded = Math.round(x);
    // Als het (bijna) een heel getal is: toon zonder decimalen
    if (Math.abs(x - rounded) < 1e-9) return "1/" + rounded;
    return "1/" + x.toFixed(2);
  }
  
  function calc(chanceInput, kills, obtained = 0) {
    let chance = parseChance(chanceInput);
    if (chance == null) return { error: "Invalid chance input." };
    if (!Number.isInteger(kills) || kills <= 0) return { error: "Kills must be an integer > 0." };
    if (!Number.isInteger(obtained) || obtained < 0) return { error: "Obtained must be an integer >= 0." };
    if (obtained > kills) return { error: "Obtained can't exceed kills." };
  
    let pLess, pExact, pMore;
  
    if (obtained < kills / 2) {
      [pLess, pExact] = binomDist(chance, kills, obtained);
      pMore = 1 - pLess - pExact;
    } else {
      [pMore, pExact] = binomDist(1 - chance, kills, kills - obtained);
      pLess = 1 - pMore - pExact;
    }
  
    return {
      chance,
      kills,
      obtained,
      expected: kills * chance,
      pExact,
      pLess,
      pMore,
      flavour: flavourText(pMore * 100, obtained),
    };
  }
  
  module.exports = { calc, fmtPct, fmtOneIn };