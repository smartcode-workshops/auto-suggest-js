class TrieNode {
    constructor(value = ' ') {
        this.children = {};
        this.isEndOfWord = false;
        this._value = value;
    }

    hasChild(c) {
        return this.children.hasOwnProperty(c);
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let c of word) {
            if (!current.hasChild(c)) {
                current.children[c] = new TrieNode(c);
            }
            current = current.children[c];
        }
        if (current.isEndOfWord) {
            return false;
        }
        current.isEndOfWord = true;
        return true;
    }

    autoSuggest(prefix) {
        let currentNode = this.root;
        for (let c of prefix) {
            if (!currentNode.hasChild(c)) {
                return [];
            }
            currentNode = currentNode.children[c];
        }
        return this.getAllWordsWithPrefix(currentNode, prefix);
    }

    getAllWordsWithPrefix(root, prefix) {
        return null;
    }

    getAllWords() {
        return this.getAllWordsWithPrefix(this.root, "");
    }

    printTrieStructure() {
        console.log("\nroot");
        this._printTrieNodes(this.root);
    }

    _printTrieNodes(root, format = " ", isLastChild = true) {
        if (root == null) return;

        process.stdout.write(`${format}`);

        if (isLastChild) {
            process.stdout.write("└─");
            format += "  ";
        } else {
            process.stdout.write("├─");
            format += "│ ";
        }

        console.log(`${root._value}`);

        let childCount = Object.keys(root.children).length;
        let i = 0;
        let children = Object.entries(root.children).sort((a, b) => a[0].localeCompare(b[0]));

        for (let [key, child] of children) {
            i++;
            let isLast = i === childCount;
            this._printTrieNodes(child, format, isLast);
        }
    }

    getSpellingSuggestions(word) {
        let firstLetter = word[0];
        let suggestions = [];
        let words = this.getAllWordsWithPrefix(this.root.children[firstLetter], firstLetter.toString());

        for (let w of words) {
            let distance = this.levenshteinDistance(word, w);
            if (distance <= 2) {
                suggestions.push(w);
            }
        }

        return suggestions;
    }

    levenshteinDistance(s, t) {
        let m = s.length;
        let n = t.length;
        let d = Array.from(Array(m), () => Array(n).fill(0));

        if (m == 0) {
            return n;
        }

        if (n == 0) {
            return m;
        }

        for (let i = 0; i <= m; i++) {
            d[i][0] = i;
        }

        for (let j = 0; j <= n; j++) {
            d[0][j] = j;
        }

        for (let j = 1; j <= n; j++) {
            for (let i = 1; i <= m; i++) {
                let cost = (s[i - 1] === t[j - 1]) ? 0 : 1;
                d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1] + cost);
            }
        }

        return d[m][n];
    }
}

module.exports = { Trie, TrieNode };