# Product Manager — technical test

## Who we are

Quiet is a French app studio based in Paris. We build consumer mobile utilities — phone and photo
cleaners, an app locker, an email cleaner. We monetise through ads and subscriptions, we ship on
Android and iOS, and we do it as a very small team, on short cycles. Nobody hands you a spec, a
design, or a backend.

## The role you are applying for

**Product Manager.** You spend hours in our apps, and in the ones we compete with. You find what is
broken, what is inconsistent, and what quietly costs us money. You report it in a form the team can
act on, and you automate that work instead of repeating it. Later you own the roadmap of an app.

This test is a small version of that job.

---

## The test

**QuietClean** is not one of our apps. It is the kind of app we build — a small utility, put
together fast. It is in this repo, and it runs on your phone in about a minute.

Use it. Find what is wrong with it. Tell us.

Budget **half a day**. It is not a hard limit.

Please **do not** push your work to a public repository. Set up private sharing **before** you start:
[docs/HOW_TO_SHARE_MY_CODE.md](./docs/HOW_TO_SHARE_MY_CODE.md)

### Run it on your phone

1. Install **Expo Go** from the App Store or the Play Store. If you have it already, update it —
   Expo Go runs one SDK version at a time, and an old copy refuses this project.
2. In this folder:

```bash
npm install
npm start
```

3. Scan the QR code in your terminal with Expo Go (Android) or with the Camera app (iPhone).

The app opens on your phone. The photo library inside it is fake and bundled, so everyone sees exactly
the same thing.

**If Expo Go says "Could not connect to the server", or "The Internet connection appears to be
offline"**, your phone cannot reach your computer. Office and public Wi-Fi block traffic between two
devices, and a phone that shares its own connection to the computer cannot reach it either. To confirm
it, open the address from the QR code in your phone browser as `http://<address>:8081` — a failure
there is the network, not the app.

Route around it with a tunnel, then scan the new QR code. It installs one package the first time:

```bash
npx expo start --tunnel
```

`npm run web` also works if you want it in a browser. The phone is the real target.

The whole source is in the repo. What you do with that is up to you.

### What we want back

A report in [docs/REPORT.md](./docs/REPORT.md). The file is empty. Its shape is your call.

Three things belong in it. Where you put them, and what you call them, is your decision.

**Everything that is wrong.** Every finding with steps we can follow. We will follow them.

**Then pick three.** The next sprint fits three fixes. Name the three, in order. Say why those three,
and why not the others. Half a page is enough.

**The money.** QuietClean sells a subscription. Where does this app lose money today? And if you had
one A/B test to run on it, what would you run, on which metric, and which result would keep it? One
page is enough.

Also fill in [docs/AI_LOG.md](./docs/AI_LOG.md) — how you worked, not just what you found.

---

## What we look for

1. **You found everything that is wrong.** This carries most of the score.
2. **We can reproduce it.** We follow your steps on our own phone. They work, or the finding does not
   count.
3. **You chose.** Three fixes, in order, with the reason for each, and the reason for the ones you
   dropped.
4. **The report is well structured.** We give you an empty file on purpose. Deciding what a finding
   needs is part of the test.
5. **Automation.** This app ships every week. Build the part of your work that runs without you. One
   example, and not a target: a check that finds one of your own findings by itself, on the next
   commit. "I would use AI to test it" scores zero.

You don't have to do all of it. This is just what we look at, in this order.

Surprise us.

---

## Notes

* Report what you can reproduce. A finding we cannot reproduce is worse than no finding.
* Say how sure you are. Being wrong and honest costs less than being wrong and confident.
* **Do this with AI.** That is how we work, and it is the part we are reading most closely — not
  whether you used it, but how you drove it. Document that in `docs/AI_LOG.md`.
* You still own the result. In the live debrief we go through it with you and ask you to change things
  on the spot.
