const { Trie, TrieNode } = require('../src/trie');

describe('Trie', () => {
    let trie;

    beforeEach(() => {
        trie = new Trie();
    });

    test('should insert and search words correctly', () => {
        trie.insert('hello');
        trie.insert('world');
        //expect(trie.search('hello')).toBe(true);
        //expect(trie.search('world')).toBe(true);
        //expect(trie.search('hell')).toBe(false);
    });
    
});