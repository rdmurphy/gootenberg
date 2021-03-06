import expect from 'expect.js';

import Gootenberg from '../index.js';
import credentials from '../../credentials.json';

const TEST_DOCS = {
  dir: '17BXq0RyRsCx3SYnK5SP3udytA62AQd_3',
  comments: '1P2LCY_qjK1BTsQswGLfXflbZkevbxzpGfwZRCa7Ijio',
  plain: '1PuNgReMyfoUr1woeaNcmAVW3z8yUrGQSNCWTKRkkuSo',
};

describe('drive', function() {
  let goot;

  before(async function() {
    goot = new Gootenberg();
    await goot.auth(credentials);
  });

  it('Gets comments', async function() {
    const comments = await goot.drive.comments(TEST_DOCS.comments);

    expect(comments).to.be.an('array');
    expect(comments).to.have.length(1);

    expect(comments[0]).to.have.property('content');
    expect(comments[0].content).to.be('Lorem ipsum.');
  });

  it('Downloads plain text', async function() {
    const text = await goot.drive.export(TEST_DOCS.plain);

    const lorem = (
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim' +
      ' ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' +
      ' aliquip ex ea commodo consequat. Duis aute irure dolor in' +
      ' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
      ' pariatur. Excepteur sint occaecat cupidatat non proident, sunt in' +
      ' culpa qui officia deserunt mollit anim id est laborum.'
    );

    expect(text.trim()).to.be(lorem);
  });

  it('Gets docs in directory', async function() {
    const docs = await goot.drive.files('name = "plain"');

    expect(docs).to.be.an('array');
    expect(docs).to.have.length(1);

    expect(docs[0]).to.have.property('id');
    expect(docs[0].id).to.be(TEST_DOCS.plain);
  });
});
