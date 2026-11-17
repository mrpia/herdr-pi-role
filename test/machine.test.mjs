import test from 'node:test';
import assert from 'node:assert/strict';
import { here } from '../host.mjs';

// `hc get` asks the core Pi runs on, so its labels carry bare ids. `herdr-app ls` asks the window,
// which prefixes the ids of a space on another machine with `<machine>/` (Pi in WSL, the app on Windows).
const term = { address: 't1m', state: 'live', labels: { 'herdr.space': 'sp1', 'herdr.tab': 'tb1' }, foreground: { pid: process.pid }, cols: 150, rows: 57 };
const space = (machine, p = machine ? `${machine}/` : '') => ({ id: `${p}sp1`, machine, tabs: [{ id: `${p}tb1`, terminals: [{ terminal: `${p}t1m`, pane: `${p}pA` }, { terminal: `${p}t2`, pane: `${p}pB` }] }] });
const pi = spaces => ({ exec: async bin => ({ code: 0, stdout: JSON.stringify(bin === 'hc' ? term : { spaces }) }) });

async function locate(spaces) {
  const saved = process.env.HC_TERMINAL_ID;
  process.env.HC_TERMINAL_ID = 't1m';
  try { return await here(pi(spaces), { mode: 'tui', cwd: '/project' }); }
  finally { if (saved === undefined) delete process.env.HC_TERMINAL_ID; else process.env.HC_TERMINAL_ID = saved; }
}

test('Pi on the app\'s own computer: bare ids match', async () => {
  assert.deepEqual(await locate([space(null)]), { pane: 'pA', direction: 'right' });
});

test('Pi on another machine of the app (WSL under the Windows app): the machine-prefixed pane is used', async () => {
  assert.deepEqual(await locate([space('wsl')]), { pane: 'wsl/pA', direction: 'right' });
});

test('A prefix must be the space\'s own machine', async () => {
  await assert.rejects(locate([{ ...space('wsl'), machine: 'other' }]), /Cannot match/);
  await assert.rejects(locate([space('wsl', '')]), /Cannot match/);
});

test('The same terminal reachable twice is refused, not guessed', async () => {
  await assert.rejects(locate([space(null), space('wsl')]), /Cannot match/);
});
