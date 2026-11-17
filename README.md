# Herdr Pi Agent

`/agent` opens a supporting agent in a pane beside your [Pi](https://pi.dev/) conversation in the [Herdr](https://herdr.dev/) workspace. The agent follows Main's prompts and replies, answers in its own pane with numbered findings, and sends nothing back unless you choose one.

This is the `/agent` extension from MEGA.dev S04E01, "Splitting Conversations, the Lab, and Your First Agents": John Lindquist's own build of the command, with the Critic. The lesson teaches you to build your own for the harness and workspace you use. This repository is the finished Pi and Herdr version, kept in step with the video so you can compare. The repository is named `herdr-pi-role` because the command was `/role` until 2026-11-11; the command you type is `/agent`.

It is the third of three small extensions that go together: [`/split`](https://github.com/johnlindquist/herdr-pi-split) branches a conversation into a new pane, [`/lab`](https://github.com/johnlindquist/herdr-pi-lab) grows and tests agents from the outside, and `/agent` opens them beside Main.

## Requirements

| You need | Why | Without it |
|---|---|---|
| [Pi](https://github.com/earendil-works/pi) 1.4 or newer (checked on 1.5.0), with a model you are signed in to | `/agent` is a Pi extension, and each agent is a second Pi | It cannot be installed |
| Pi running in a pane of the [Herdr](https://github.com/herdrdev/herdr-app) desktop app | Herdr opens the pane beside Main | `/agent critic` prints: "/agent opens its pane with Herdr. Run Pi inside a pane of the Herdr desktop app (with hc and herdr-app on PATH), then try again." Nothing else happens |
| Herdr's command-line tools `hc` and `herdr-app` on your `PATH` | `/agent` asks Herdr for the pane through them | `/agent critic` prints: "/agent could not run hc. Install Herdr's command-line tools…" and no pane opens |
| Node 22.19 or newer | Pi runs on it; the unit tests use it | Pi does not start |
| `git` | `pi install` clones this repository | The install fails |
| macOS | The only system this was checked on | Unverified |

`/agent --help`, the list of agents and the typing hints work in any terminal, also outside Herdr. A small, fast model (Haiku) is the default when you have one; if you have none, the picker starts on Main's model.

## Install

```sh
pi install git:github.com/johnlindquist/herdr-pi-role
```

Then run `/reload` in Pi, or start Pi again. The install has no dependencies to download. The first time Pi starts in a folder it asks "Trust project folder?"; that question is Pi's, not this extension's.

- Update: `pi update --extensions`
- A fixed version: `pi install git:github.com/johnlindquist/herdr-pi-role@v0.9.0`
- Only in one project: `pi install --local --approve git:github.com/johnlindquist/herdr-pi-role`, run in that project. Without `--approve`, Pi refuses with "Project is not trusted" in a project it has not seen before.
- Remove: `pi remove git:github.com/johnlindquist/herdr-pi-role`

[`/lab`](https://github.com/johnlindquist/herdr-pi-lab) finds `/agent` from either kind of install.

## The walkthrough from the video

Type these in Main, in a Herdr pane, in the video's order. The video's sample replies are drawn examples; your agent's words will differ. The pictures are real captures of a second Herdr window running Pi in a fresh clone of [RentAPlace](https://github.com/johnlindquist/rentaplace), with this extension installed from GitHub. The model's wording will differ on your machine.

### 1. See what `/agent` offers

```text
/agent
```

Pi lists the agents (Critic, Notes, Research, Historian, any saved in the project) and the commands. A dim line above the input reads `/agent [name] [job]`: both are optional, and a bare `/agent` opens a Critic.

```text
/agent --help
```

prints the whole guide in the pane where you typed it. `/agent help send` explains sending.

### 2. Check the plumbing with a throwaway agent

```text
/agent Repeater Repeat Main's last prompt in at most five words, as one numbered finding.
```

A model picker opens with the fast default highlighted (Haiku); Enter accepts it. A pane opens beside Main and its last line reads `Repeater · watching Main`. Main's last line reads `Agents: Repeater`. Now type any prompt in Main. The Repeater restates it as finding 1 in its own pane, and Main's conversation shows no extra turn.

Type a few words in Main's input and leave them unsent. In the Repeater's pane type:

```text
/agent send main #1
```

Main shows one line, `from Repeater · …`, and `1 agent note` in its last line. The words you left in Main's input are unchanged. Close the Repeater's pane, or run `/agent stop Repeater` in Main.

### 3. Bring the Critic home

```text
/reload
/agent critic
```

The name is not case sensitive. The Critic opens beside Main on the small, fast model and is already watching.

![Two panes. Left, Main, whose last line reads Agents: critic. Right, the Critic's pane showing its job under Temporary role: critic, and its last line critic · watching Main](docs/screenshots/agent-open.png)

The right pane is the Critic. It shows the job it was given and its last line says who it is watching. Main's last line lists the agents attached to it. Then, in Main, in [RentAPlace](https://github.com/johnlindquist/rentaplace):

```text
add a feature where guests must book at least a few days at the house
```

The Critic answers in its own pane: one verdict line with a grade, then a short numbered list. In the video the two findings are "Please be more specific with days" and "This might break existing bookings, how should we roll this out?". The Critic checks three things on every prompt: is there enough to finish the whole task, what else does the change touch, and should it be smaller steps.

![Left, Main's reply about the minimum-stay change. Right, the Critic's reply: a grade line B · wired in booking and quote; search gap remains, then six numbered findings](docs/screenshots/agent-findings.png)

Main did the work on the left. The Critic read the same conversation and answered on the right, in its own pane: a grade, then numbered findings. Nothing was added to Main's conversation.

### 4. Send one finding back to Main

In the **Critic's pane**, press **↑**. A card under the input shows one finding ("Item 1 · Enter sends to Main"); ↑ and ↓ move between findings. Press **Enter** to send that one. Esc goes back to typing. Or type `/agent send main #2` there (`#1,3` sends two).

![The Critic's pane after pressing Up: a card reads Item 1 · Enter sends to Main with the first finding under it and the keys ↑/↓ select · Esc draft. In Main, the words my unsent draft sit in the input](docs/screenshots/agent-select.png)

The card under the Critic's input holds one finding at a time. Nothing has been sent yet. Main, on the left, has words typed and not sent.

In Main you see `from critic · …` and `1 agent note · /agent inbox`. Main's running reply is not interrupted and what you typed in its input is not changed. The note is read with your next prompt in Main; `/agent inbox` shows it before that.

![After Enter: the Critic's card reads Item 1 · Sent to Main. In Main a dim line starts from critic · and the last line reads Agents: critic · 1 agent note; the words my unsent draft are still in the input](docs/screenshots/agent-sent.png)

The finding arrived in Main as one dim `from critic` line, the last line counts one agent note, and the unsent words are exactly as they were.

If the Critic calls out something dangerous, interrupt Main yourself (Esc in Main). The Critic does not interrupt Main.

### The agent you grew in the lab

A saved agent is a folder in your project, `agents/<name>/`, written and tested by [`/lab new <name>`](https://github.com/johnlindquist/herdr-pi-lab). `/agent <name>` with no job opens it with the text under `## Job` in `agents/<name>/agent.md`, so the job the lab proved is the job that runs. This also holds for `agents/critic/agent.md`: when the project has one, `/agent critic` uses its job in place of the built-in Critic job. With no such file, `critic`, `notes` and `research` use their built-in jobs, and any other name needs a job on the same line.

## Troubleshooting

- **"Project is not trusted. Use --approve"** when installing with `--local`: use the install line above (no `--local`), or add `--approve`.
- **"/agent opens its pane with Herdr…"**: this Pi is not in a Herdr pane. Start Pi from a pane of the Herdr desktop app.
- **"/agent could not run hc…"**: put Herdr's `hc` and `herdr-app` on your `PATH`.
- **"Cannot match this Pi process to exactly one local Herdr pane"**: `hc get "$HC_TERMINAL_ID"` and `herdr-app ls` should name the same terminal and pane. The extension does not guess the focused pane. When Pi runs on another machine of the app (Pi in WSL, the Herdr app on Windows), `herdr-app` in that shell must be the app's own CLI (`herdr-app.exe`), and `herdr-app ls` shows the ids with a `<machine>/` prefix, which the match allows.
- **No `/agent` in the slash menu:** run `/reload`, and check `pi list` shows this package once.
- **The agent's status stays "opening":** look in the new pane for a trust question or a model error. After 90 seconds Main says the agent never connected.
- **"… needs a "## Job" section":** `agents/<name>/agent.md` exists but has no text under `## Job`.
- **No note appeared in Main:** an agent's ordinary replies stay in its pane. Send one with ↑ and Enter or `/agent send main #2` in the agent's pane, then `/agent inbox` in Main.
- **A link ended:** `/reload`, switching session or closing the pane disconnects it. Both conversations stay readable. Open a fresh agent from Main.

## How it is built

| File | What it holds |
|---|---|
| [`index.ts`](index.ts) | Registers `/agent` (and the old name `/role`), the hooks that pass Main's new prompts and finished replies to each agent, the inbox for notes sent back, and the `temporary_role` tool that gives an agent in Main the same operations |
| [`guide.ts`](guide.ts), [`command-menu.ts`](command-menu.ts) | `--help`, the list shown as you type, and the dim hint above the input |
| [`model-picker.ts`](model-picker.ts), [`models.ts`](models.ts) | The model picker and the small, fast default |
| [`host.mjs`](host.mjs) | The starter jobs, the copy of Main's conversation the agent starts from, what is passed on (prompt and reply text, not tool calls, tool results, images or reasoning), and the Herdr calls (`hc get`, `herdr-app ls`, `herdr-app do pane.split`) |
| [`launch.mjs`](launch.mjs), [`role-launch.ts`](role-launch.ts) | Start the second Pi in the new pane on the chosen model, with read-only tools unless `--work` |
| [`wire.mjs`](wire.mjs) | The private local connection between Main and one agent (a single-use ticket; nothing leaves the computer) |
| [`presentation.mjs`](presentation.mjs) | How an agent is told to answer (a verdict and numbered findings) and how `#2` picks one finding |
| [`reply-tray.ts`](reply-tray.ts) | ↑, ↓ and Enter in the agent's pane |
| [`saved-agents.mjs`](saved-agents.mjs), [`notices.mjs`](notices.mjs) | `agents/<name>/agent.md`, and the lines people read when something is missing or a finding arrives |
| [`history.ts`](history.ts), [`project-roles.mjs`](project-roles.mjs), [`run-role.mjs`](run-role.mjs), [`standalone.ts`](standalone.ts) | Not in the video: Historian and project agents (below) |
| [`test/`](test/) | Unit tests; `npm test` needs neither Herdr nor a model |

## Building the same for another harness or workspace

The lesson teaches you to build your own; this one is a reference, not a requirement. In the video John asks his agent for it in five lines:

```text
# The /agent command
/agent <name> <job>
Opens a pane beside Main and watches Main's conversation.
Please make it intuitive.
Each agent has its own model picker.
```

That is enough when the agent can read the source of your harness and workspace. `/agent` needs four things from your tools:

1. **Custom commands** in the harness that do not add a turn to the conversation. Here: a Pi extension command. Otherwise use a shell command or a workspace key binding.
2. **Opening a pane from a command line** and starting the harness in it with a job and a model. Here: `herdr-app do pane.split`. In tmux: `split-window`.
3. **Reading the conversation as it grows**: an event, a hook when a prompt is sent and when a reply ends, or the conversation file on disk. Here: Pi's `message_end` event.
4. **Handing one finding back** without interrupting a running reply or changing an unsent draft. Here: a note kept in Main's session and added to your next prompt. Without such a hook, keep notes in a queue file and paste them yourself.

Public material from the lesson: the sample project [RentAPlace](https://github.com/johnlindquist/rentaplace), the lab and the [Critic's expectations file](https://github.com/johnlindquist/herdr-pi-lab/blob/main/examples/critic/expectations.md), [`/split`](https://github.com/johnlindquist/herdr-pi-split), and the [Pi extension docs](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md).

## Beyond the video

Everything below works alongside the walkthrough and can be ignored while following the lesson: more ways to open and address agents, `--work` agents, Historian, a desk menu for a companion extension, and project agents.

### Find your way while typing

Type **`/agent`**. Pi lists the agents and commands immediately; no Space or Tab is needed to reveal them. Choose an agent with ↑/↓. **Enter** opens a searchable model picker; confirm to open that agent. **Tab** on an agent also shows the picker, but choosing a model only fills the draft so you can still add a job. Esc cancels without forking. You can also type a name and a job before pressing Enter. A dim usage hint above the editor shows the next argument without inserting it. For example, with Notes already open, type `/agent se`, Tab to complete `send`, then Space for the recipient hint. Press Tab to list or complete recipients, or type the first letter to narrow the choices. Choose a target, add a space and write your message; submit the finished draft with Enter. Esc dismisses a visible list so you can keep typing your own name. Free-form jobs and messages are not completed or replaced.

Main offers starter agents and live recipients. A linked child offers `main`, not its siblings; disconnected children don’t offer send. `--work` is always explicit. Run `/agent help` for the guide in this pane or `/agent help send` for messaging details. Other help topics: `open`, `work`, `inbox`, `status`, `stop`.

### Give a pane a job

`/agent` opens a Critic. `/agent Notes` and `/agent Research` also have starter jobs. To name your own agent and set its job in one line:

```text
/agent Availability Check whether we still offer a home after someone books it.
```

The chosen **provider/model** runs in the child; Main’s model never changes. The picker lists configured chat models (scoped choices when configured, plus Main); type to filter by provider, ID or name. To bypass the picker, use `/agent Critic --model main`, or `/agent NAME --model provider/model [job]` with an exact ID. Inside the model picker, **Tab** cycles the highlighted model’s supported thinking levels; Enter keeps the displayed setting. A non-reasoning model shows **off (fixed)**. The initial level comes from the scoped model setting or Main, adjusted to the model’s capabilities. For a direct launch, add `--thinking high` immediately after `--model provider/model` and before the job. Unsupported explicit levels are rejected rather than substituted. The child verifies its model before linking. Changing its model later ends the link rather than silently forwarding new Main messages to a different provider.

For watching agents, the chosen provider receives the fork and subsequent watched text when the agent runs. Historian instead reads excerpts on demand. The fork includes the current **branch**, including its prior tool history. After the fork, only new prompt and answer **text** is forwarded, not tool calls, tool results, images, or reasoning. Each observation can use model tokens. Busy agents batch observations rather than interrupt an answer. Long observations are trimmed; if an agent falls more than 24 messages behind, it reports skipped observations. Both panes run on the same computer and use the same Pi profile; the chosen provider may use a different account.

By default the agent can inspect files using the reading tools available in Main. For a job that needs to change files or run commands, opt in when you open it (the agent then gets write, edit and shell tools even when Main itself is read-only): `/agent --work Notes Keep agreed decisions in notes.md`. Work agents share the project directory; give each writer its own files. These are Pi tool limits, not an operating-system sandbox. The extension needs normal local permissions and does not transmit messages to an external messaging service.

### Use the agent pane from the keyboard

In a linked terminal agent, type and press **Enter** to ask privately. Press **↑/↓** in a single-line draft to select a finished reply. A preview under the editor shows what would be sent; **PgUp/PgDn** reads longer previews. **Enter** sends only the selected reply to Main’s inbox, once. New arrivals don’t move your selection. **Esc** or editing returns to writing without clearing your draft. Multiline drafts, slash commands and autocomplete keep Pi’s normal keys. Main’s editor is unchanged.

The last twelve finished answers from this link are selectable, not inherited history, tool output or partial answers. Replies over 2,400 characters can be inspected but not forwarded. For automation inside the linked agent, use temporary_role with action **replies**, then **forward** with the exact reply number on explicit request. Manual `/agent send main …` still works.

### Read an agent’s reply

Every agent is quick visual support: its reply is a `#` verdict led by a status emoji, then a numbered list of one-line findings, each led by an emoji. Critic grades the request (🟢 A to 🔴 D) and has three jobs: ❓ information the prompt leaves out that Main would have to guess, 💥 the blast radius (what else the change touches, asked as “should it change too?”) and ✂️ a task too big for one step, with the first smaller step; then one ➡️ next step. Notes lists ✅ decided, ❓ open and ⏭️ next; Research lists 🔎 findings with sources and trust stars. Send one finding to Main with `/agent send main #2` (or `#1,3`), or press ↑ in the agent's input: each numbered item is its own card, so Enter sends just that piece. Critic is adversarial and checks files before objecting. Besides prompts and answers, Critic receives Main’s progress: tool steps (without their output) in batches of three and a note when Main is interrupted. Research can also use installed web tools (`web_search`, `fetch_content`, `get_search_content`, `source_check`, `google_search`) and cites URLs or file paths. Other agents use the same verdict and numbered findings. These are writing instructions for the agent, not a parser: the model can honor a different format you request, and `#N` only works on numbered lines.

A watched turn shows its origin and a two-line excerpt. Expand it with Pi’s expand-output shortcut to read the forwarded Markdown. Leading Pi skill attachments are identified by name rather than repeated in full; long observations retain the beginning and the end. Main’s original message is unchanged.

### Send a message deliberately

| Where you type | Command | What happens |
|---|---|---|
| Main | `/agent send Critic Which assumption should I check first?` | Only Critic gets a direct request. Its answer stays in its pane. |
| Main | `/agent send all Focus on what the guest sees.` | Each linked agent gets the same request. A busy agent waits until its current answer is finished. |
| Critic | `/agent send main A second search still offers the booked home.` | Main gets an inbox note, not a new prompt. Its current answer and editor draft are untouched. |
| Main | `/agent inbox` | Read pending notes without calling a model. On Main’s next user prompt they enter context as attributed notes, not instructions. |
| Either | `/agent status` | Inspect the links. **Opening** means the pane has not checked in; **watching** means the fork has connected. |
| Main / agent | `/agent stop Critic` / `/agent stop` | Disconnect the link. Both conversations stay open and usable. |

The message receipt confirms acceptance by the other pane, not a completed answer. An offline agent or full inbox reports a failure. A lost connection before a receipt means delivery is uncertain: inspect before resending. Close an agent pane normally when you are done. Closing, reloading or switching a linked session disconnects it; changing branches does not silently redirect it. Open a fresh agent from Main to start a new link. Pi keeps normal session history, but no reusable agent or background watcher is installed.

### Agent access

The `temporary_role` tool uses the same operations as `/agent`. Start with `{"action":"help"}` or `{"action":"help","topic":"send"}` for the current pane, then `{"action":"status"}` for its actual links. `models` (optional `query`) returns exact configured IDs. `open` takes `name`, `job`, optional `work` and optional `model` (exact provider/model; defaults to Main without a picker), and optional `thinking` (one of that model’s `levels`); `send` takes `target` and `message`; `stop` takes a target in Main; `inbox` lists pending notes in Main. Use the **session ID** from status for a specific agent, `all` for a broadcast, or `main` from a child. Open visible panes or send messages only on request. An agent cannot use the tool to send a note during an automatic observation. A direct agent conversation or explicit command can. A stale ID never addresses a replacement with the same name.

### Ask Historian from Main

`/historian Why did we drop the first demo?` uses Main’s model for one read-only history turn. The answer appears right in this thread; no pane or inbox step is required. Or ask Main in ordinary language to consult Historian.

Historian searches the active branch of this Pi session, including original messages before compaction. Ask for the speaker, entry ID and exact wording. It can distinguish a compaction summary from an original message, but cannot recover deleted entries. Other sessions, sibling branches, raw tool output, hidden thinking and images are outside the search.

For a private ongoing conversation, open /agent Historian (or /desk Historian with the optional desk; it was /widget before 2026-11-12). Unlike a watching agent, it starts with just its job, waits for a question, and requests excerpts from its linked Main. It has no shell or file tools. A different chosen provider can receive those excerpts. Private answers stay there unless explicitly sent back.

Agent interface: historian({query, beforeCompaction?, page?}) searches literal text; omit query for newest entries. historian({entry, offset?}) reads a longer excerpt by ID. Results report total matches and source positions; no match is not proof the event never happened.

### Project agents connected to a local app

A project can define its own named agents in `.pi/roles.json`. A project agent has a one-sentence `hint` for the menus, a `job`, optional read-only `state` endpoints, an optional pinned `model` (exact provider/model) with a `thinking` level, and an optional `vocab` line for its reply items:

```jsonc
{ "roles": { "Review": {
    "hint": "Moment review · live state",
    "job": "Support the review. Fetch desk_state before answering.",
    "state": { "state": "https://review.example.localhost/api/state" },
    "model": "provider/model", "thinking": "medium" } } }
```

Project agents appear in the `/agent` list under the built-ins (which they cannot shadow), open like any other agent, and keep the normal read-only file tools. An agent with `state` also gets the **desk_state** tool: a GET of its configured endpoints only, restricted to `*.localhost` over HTTPS (verified against the portless CA in `~/.portless/ca.pem` when present) or `127.0.0.1` over HTTP. A very large JSON view is returned as a bounded sample; `view` plus `path` (`parts.0.slides`) reads an exact slice. An unreachable app is reported as such — the agent is told to say so rather than guess. A pinned model is that agent's default and skips the picker; an explicit `--model` still overrides it, and the pinned ref stays selectable even when `/scoped-models` leaves it out. Changing `roles.json` takes effect at the next open; already-linked panes keep the job they started with.

A project agent can also run as its **own standalone pi session**, without a Main link: `run-role.mjs` exports `runProjectRole(name)`, which starts `pi` on the agent's pinned model and thinking level with `standalone.ts` loaded — the same job in the system prompt and the same `desk_state` tool. A thin project wrapper is enough:

```ts
#!/usr/bin/env node
import { runProjectRole } from '../.pi/extensions/temporary-role/run-role.mjs';
process.chdir(new URL('..', import.meta.url).pathname);
runProjectRole('Review');
```

Extra arguments pass through to `pi` (`agents/review.ts -p "…"` runs one print-mode turn). The standalone session is an ordinary pi session with its normal tools; the agent's read-only discipline comes from its job text, not a tool cage.

### A companion desk

A trusted sibling extension can show an agent in its own renderer in place of a terminal pane (the optional `/desk` command, `/widget` before 2026-11-12) by asking on the `herdr-role:view.v2` Pi event. This extension still owns the copy of the conversation, read-only access, the agent's identity, the inbox and the disconnect. Nothing extra is needed for `/agent`.

## Testing

```sh
git clone https://github.com/johnlindquist/herdr-pi-role && cd herdr-pi-role && npm test
```

The unit tests cover the guide and hints, what is passed on from Main, saved agents, picking a finding by number, the note line in Main and the connection ticket. They need no install step, no Herdr and no model.

## Licence

[MIT](LICENSE)
