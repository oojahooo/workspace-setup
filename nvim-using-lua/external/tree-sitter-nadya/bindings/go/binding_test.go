package tree_sitter_nadya_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-nadya"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_nadya.Language())
	if language == nil {
		t.Errorf("Error loading Nadya grammar")
	}
}
