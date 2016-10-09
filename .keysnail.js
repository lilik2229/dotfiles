// ========================== KeySnail Init File =========================== //

// この領域は, GUI により設定ファイルを生成した際にも引き継がれます
// 特殊キー, キーバインド定義, フック, ブラックリスト以外のコードは, この中に書くようにして下さい
// ========================================================================= //
// {{%PRESERVE%
style.register(['#keysnail-prompt-textbox *|input {',
		'ime-mode : inactive !important;',
		'}'].join("\n"));
// }}%PRESERVE%

//bmany デフォルトで新しいタブを開きフォーカスを当てる
// plugins.options["bmany.default_open_type"] = "tab";

// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-g";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "<f3>";
key.macroEndKey          = "<f4>";
key.suspendKey           = "<f2>";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";

//Tanything 0.1.4用設定
plugins.options["tanything_opt.keymap"] = {
    "C-z"   : "prompt-toggle-edit-mode",        //ローカルキーバインドモードを抜けて編集モードに移行
    "C-v"   : "prompt-next-page",               //一画面スクロールダウン
    "M-v"   : "prompt-previous-page",           //一画面スクロールアップ
    "j"     : "prompt-next-completion",         //次のアイテムに移動
    "k"     : "prompt-previous-completion",     //前のアイテム移動
    "g"     : "prompt-beginning-of-candidates", //最初のアイテムに移動
    "G"     : "prompt-end-of-candidates",       //最後のアイテムに移動
    // Tanything specific actions
    "q"     : "localClose",                     //選択したタブを閉じる
    "p"     : "localLeftclose",                 //選択したタブの左にあるタブをすべて閉じる
    "n"     : "localRightclose",                //選択したタブの右にあるタブをすべて閉じる
    "M-a"   : "localAllclose",                  //選択したタブ以外をすべて閉じる(キーバインド”a”だと押し間違いがあるので"M-a"に変更。)
    "c"     : "localClipUT",                    //選択したタブのタイトルとURLをHTMLタグつきでコピー
    "C"     : "localClipU",                     //選択したタブのURLをHTMLタグつきでコピー
    "e"     : "localMovetoend",                 //選択したタブを末尾に移動
    "a"     : "localMovetostart",               //選択したタブを先頭に移動//追加
};

// ================================= Hooks ================================= //

hook.addToHook('KeyBoardQuit', function (aEvent) {
         if (key.currentKeySequence.length)
             return;

         command.closeFindBar();

         let marked = command.marked(aEvent);

         if (util.isCaretEnabled())
         {
             if (marked)
             {
                 command.resetMark(aEvent);
             }
             else
             {
                 if ("blur" in aEvent.target) aEvent.target.blur();

                 gBrowser.focus();
                 _content.focus();
             }
         }
         else
         {
             goDoCommand("cmd_selectNone");
         }

         if (KeySnail.windowType === "navigator:browser" && !marked)
         {
             key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
         }
     });

// ============================= Key bindings ============================== //

// ============================= Global ============================== //
key.setGlobalKey('C-M-r', function (ev) {
                userscript.reload();
            }, '設定ファイルを再読み込み', true);

key.setGlobalKey('M-x', function (ev, arg) {
                ext.select(arg, ev);
            }, 'エクステ一覧表示', true);

key.setGlobalKey('M-:', function (ev) {
                command.interpreter();
            }, 'JavaScript のコードを評価', true);

key.setGlobalKey(["<f1>", "b"], function (ev) {
                key.listKeyBindings();
            }, 'キーバインド一覧を表示', false);

key.setGlobalKey('C-m', function (ev) {
                key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RETURN, true);
            }, 'リターンコードを生成', false);

key.setGlobalKey(["<f1>", "F"], function (ev) {
                openHelpLink("firefox-help");
            }, 'Firefox のヘルプを表示', false);

key.setGlobalKey(["C-x", "l"], function (ev) {
                command.focusToById("urlbar");
            }, 'ロケーションバーへフォーカス', true);

key.setGlobalKey(["C-x", "g"], function (ev) {
                command.focusToById("searchbar");
            }, '検索バーへフォーカス', true);

key.setGlobalKey(["C-x", "t"], function (ev) {
                command.focusElement(command.elementsRetrieverTextarea, 0);
            }, '最初のインプットエリアへフォーカス', true);

key.setGlobalKey(["C-x", "s"], function (ev) {
                command.focusElement(command.elementsRetrieverButton, 0);
            }, '最初のボタンへフォーカス', true);

key.setGlobalKey('M-w', function (ev) {
                command.copyRegion(ev);
            }, '選択中のテキストをコピー', true);

key.setGlobalKey('C-s', function (ev) {
                command.iSearchForwardKs(ev);
            }, 'Emacs ライクなインクリメンタル検索', true);

key.setGlobalKey('C-r', function (ev) {
                command.iSearchBackwardKs(ev);
            }, 'Emacs ライクな逆方向インクリメンタル検索', true);

key.setGlobalKey(["C-x", "k"], function (ev) {
                BrowserCloseTabOrWindow();
            }, 'タブ / ウィンドウを閉じる', false);

key.setGlobalKey(["C-x", "K"], function (ev) {
                closeWindow(true);
            }, 'ウィンドウを閉じる', false);

key.setGlobalKey(["C-x", "u"], function (ev) {
                undoCloseTab();
            }, '閉じたタブを元に戻す', false);

key.setGlobalKey(["C-x", "n"], function (ev) {
                OpenBrowserWindow();
            }, 'ウィンドウを開く', false);

key.setGlobalKey('C-M-l', function (ev) {
                getBrowser().mTabContainer.advanceSelectedTab(1, true);
            }, 'ひとつ右のタブへ', false);

key.setGlobalKey('C-M-h', function (ev) {
                getBrowser().mTabContainer.advanceSelectedTab(-1, true);
            }, 'ひとつ左のタブへ', false);

key.setGlobalKey(["C-x", "C-c"], function (ev) {
                goQuitApplication();
            }, 'Firefox を終了', true);

key.setGlobalKey(["C-x", "o"], function (ev, arg) {
                command.focusOtherFrame(arg);
            }, '次のフレームを選択', false);

key.setGlobalKey(["C-x", "1"], function (ev) {
                window.loadURI(ev.target.ownerDocument.location.href);
            }, '現在のフレームだけを表示', true);

key.setGlobalKey(["C-x", "C-f"], function (ev) {
                BrowserOpenFileWindow();
            }, 'ファイルを開く', true);

key.setGlobalKey(["C-x", "C-s"], function (ev) {
                saveDocument(window.content.document);
            }, 'ファイルを保存', true);

key.setGlobalKey(["C-c", "C-c", "C-v"], function (ev) {
                toJavaScriptConsole();
            }, 'Javascript コンソールを表示', true);

key.setGlobalKey(["C-c", "C-c", "C-c"], function (ev) {
                command.clearConsole();
            }, 'Javascript コンソールの表示をクリア', true);

// ============================= EDIT ============================== //
key.setEditKey(["C-x", "h"], function (ev) {
                command.selectAll(ev);
            }, '全て選択', true);

key.setEditKey([["C-SPC"], ["C-@"]], function (ev) {
                command.setMark(ev);
            }, 'マークをセット', true);

key.setEditKey('C-o', function (ev) {
                command.openLine(ev);
            }, '行を開く (Open line)', false);

key.setEditKey([["C-x", "u"], ["C-_"]], function (ev) {
                display.echoStatusBar("Undo!", 2000);
                goDoCommand("cmd_undo");
            }, 'アンドゥ', false);

key.setEditKey('C-\\', function (ev) {
                display.echoStatusBar("Redo!", 2000);
                goDoCommand("cmd_redo");
            }, 'リドゥ', false);

key.setEditKey('C-a', function (ev) {
                command.beginLine(ev);
            }, '行頭へ移動', false);

key.setEditKey('C-e', function (ev) {
                command.endLine(ev);
            }, '行末へ', false);

key.setEditKey('C-f', function (ev) {
                command.nextChar(ev);
            }, '一文字右へ移動', false);

key.setEditKey('C-b', function (ev) {
                command.previousChar(ev);
            }, '一文字左へ移動', false);

key.setEditKey('M-f', function (ev) {
                command.forwardWord(ev);
            }, '一単語右へ移動', false);

key.setEditKey('M-b', function (ev) {
                command.backwardWord(ev);
            }, '一単語左へ移動', false);

key.setEditKey('C-n', function (ev) {
                command.nextLine(ev);
            }, '一行下へ', false);

key.setEditKey('C-p', function (ev) {
                command.previousLine(ev);
            }, '一行上へ', false);

key.setEditKey('C-v', function (ev) {
                command.pageDown(ev);
            }, '一画面分下へ', false);

key.setEditKey('M-v', function (ev) {
                command.pageUp(ev);
            }, '一画面分上へ', false);

key.setEditKey('M-<', function (ev) {
                command.moveTop(ev);
            }, 'テキストエリア先頭へ', false);

key.setEditKey('M->', function (ev) {
                command.moveBottom(ev);
            }, 'テキストエリア末尾へ', false);

key.setEditKey('C-d', function (ev) {
                goDoCommand("cmd_deleteCharForward");
            }, '次の一文字削除', false);

key.setEditKey('C-h', function (ev) {
                goDoCommand("cmd_deleteCharBackward");
            }, '前の一文字を削除', false);

key.setEditKey('M-d', function (ev) {
                command.deleteForwardWord(ev);
            }, '次の一単語を削除', false);

key.setEditKey([["C-<backspace>"], ["M-<delete>"]], function (ev) {
                command.deleteBackwardWord(ev);
            }, '前の一単語を削除', false);

key.setEditKey('M-u', function (ev, arg) {
                command.wordCommand(ev, arg, command.upcaseForwardWord, command.upcaseBackwardWord);
            }, '次の一単語を全て大文字に (Upper case)', false);

key.setEditKey('M-l', function (ev, arg) {
                command.wordCommand(ev, arg, command.downcaseForwardWord, command.downcaseBackwardWord);
            }, '次の一単語を全て小文字に (Lower case)', false);

key.setEditKey('M-c', function (ev, arg) {
                command.wordCommand(ev, arg, command.capitalizeForwardWord, command.capitalizeBackwardWord);
            }, '次の一単語をキャピタライズ', false);

key.setEditKey('C-k', function (ev) {
                command.killLine(ev);
            }, 'カーソルから先を一行カット (Kill line)', false);

key.setEditKey('C-y', command.yank, '貼り付け (Yank)', false);

key.setEditKey('M-y', command.yankPop, '古いクリップボードの中身を順に貼り付け (Yank pop)', true);

key.setEditKey('C-M-y', function (ev) {
                if (!command.kill.ring.length)
                    return;

                let ct = command.getClipboardText();
                if (!command.kill.ring.length || ct != command.kill.ring[0]) {
                    command.pushKillRing(ct);
                }

                prompt.selector(
                    {
                        message: "Paste:",
                        collection: command.kill.ring,
                        callback: function (i) { if (i >= 0) key.insertText(command.kill.ring[i]); }
                    }
                );
            }, '以前にコピーしたテキスト一覧から選択して貼り付け', true);

key.setEditKey('C-w', function (ev) {
                goDoCommand("cmd_copy");
                goDoCommand("cmd_delete");
                command.resetMark(ev);
            }, '選択中のテキストを切り取り (Kill region)', true);

key.setEditKey(["C-x", "r", "d"], function (ev, arg) {
                command.replaceRectangle(ev.originalTarget, "", false, !arg);
            }, '矩形削除', true);

key.setEditKey(["C-x", "r", "t"], function (ev) {
                prompt.read("String rectangle: ", function (aStr, aInput) {
                                command.replaceRectangle(aInput, aStr);
                            },
                            ev.originalTarget);
            }, '矩形置換', true);

key.setEditKey(["C-x", "r", "o"], function (ev) {
                command.openRectangle(ev.originalTarget);
            }, '矩形行空け', true);

key.setEditKey(["C-x", "r", "k"], function (ev, arg) {
                command.kill.buffer = command.killRectangle(ev.originalTarget, !arg);
            }, '矩形キル', true);

key.setEditKey(["C-x", "r", "y"], function (ev) {
                command.yankRectangle(ev.originalTarget, command.kill.buffer);
            }, '矩形ヤンク', true);

key.setEditKey('M-n', function (ev) {
                command.walkInputElement(command.elementsRetrieverTextarea, true, true);
            }, '次のテキストエリアへフォーカス', false);

key.setEditKey('M-p', function (ev) {
                command.walkInputElement(command.elementsRetrieverTextarea, false, true);
            }, '前のテキストエリアへフォーカス', false);

// ============================= VIEW ============================== //
key.setViewKey("j", function (ev) {
                key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_DOWN, true);
            }, '一行スクロールダウン', false);

key.setViewKey("k", function (ev) {
                key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_UP, true);
            }, '一行スクロールアップ', false);

key.setViewKey([["C-f"], ["."]], function (ev) {
                key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
            }, '右へスクロール', false);

key.setViewKey([["C-b"], [","]], function (ev) {
                key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_LEFT, true);
            }, '左へスクロール', false);

key.setViewKey([["M-v"]], function (ev) {
                goDoCommand("cmd_scrollPageUp");
            }, '一画面分スクロールアップ', false);

key.setViewKey('C-v', function (ev) {
                goDoCommand("cmd_scrollPageDown");
            }, '一画面スクロールダウン', false);

key.setViewKey([["M-<"], ["g"]], function (ev) {
                goDoCommand("cmd_scrollTop");
            }, 'ページ先頭へ移動', true);

key.setViewKey([["M->"], ["G"]], function (ev) {
                goDoCommand("cmd_scrollBottom");
            }, 'ページ末尾へ移動', true);

key.setViewKey([["C-n"],["l"]], function (ev) {
                getBrowser().mTabContainer.advanceSelectedTab(1, true);
            }, 'ひとつ右のタブへ', false);

key.setViewKey([["C-p"],["h"]], function (ev) {
                getBrowser().mTabContainer.advanceSelectedTab(-1, true);
            }, 'ひとつ左のタブへ', false);

key.setViewKey(':', function (ev, arg) {
                shell.input(null, arg);
            }, 'コマンドの実行', true);

key.setViewKey('r', function (ev) {
                BrowserReload();
            }, '更新', true);

key.setViewKey([["B"],["H"]], function (ev) {
                BrowserBack();
            }, '戻る', false);

key.setViewKey('F', function (ev) {
                BrowserForward();
            }, '進む', false);

key.setViewKey(["C-x", "h"], function (ev) {
                goDoCommand("cmd_selectAll");
            }, 'すべて選択', true);

key.setViewKey('f', function (ev) {
                command.focusElement(command.elementsRetrieverTextarea, 0);
            }, '最初のインプットエリアへフォーカス', true);

key.setViewKey('M-p', function (ev) {
                command.walkInputElement(command.elementsRetrieverButton, true, true);
            }, '次のボタンへフォーカスを当てる', false);

key.setViewKey('M-n', function (ev) {
                command.walkInputElement(command.elementsRetrieverButton, false, true);
            }, '前のボタンへフォーカスを当てる', false);

key.setViewKey('f', function (aEvent, aArg) {
    ext.exec("hok-start-foreground-mode", aArg);
}, 'Hit a Hint を開始', true);

key.setViewKey('F', function (aEvent, aArg) {
    ext.exec("hok-start-background-mode", aArg);
}, 'リンクをバックグラウンドで開く Hit a Hint を開始', true);

key.setViewKey(';', function (aEvent, aArg) {
    ext.exec("hok-start-extended-mode", aArg);
}, 'HoK - 拡張ヒントモード', true);

key.setViewKey(['C-c', 'C-f'], function (aEvent, aArg) {
    ext.exec("hok-start-continuous-mode", aArg);
}, 'リンクを連続して開く Hit a Hint を開始', true);

key.setViewKey('a', function (ev, arg) {
    ext.exec("tanything", arg);
}, 'タブを一覧表示', true);

// s を入力するとエンジン選択画面が開く。 j/k で上下へ。 Enter や s で決定。
// エンジンを決定したら検索語句を入力する画面へ。ここで文字を入力して TAB を押すとサジェストの結果で補完される。(TABを押すごとに順次補完候補の移動)
key.setViewKey('S', function (ev, arg) {
    var file = Components.classes["@mozilla.org/file/local;1"]
                       .createInstance(Components.interfaces.nsILocalFile);
                   file.initWithPath("/usr/bin/xvkbd");
                   var process = Components.classes["@mozilla.org/process/util;1"]
                       .createInstance(Components.interfaces.nsIProcess);
                   process.init(file);
                   var args = ["-text",  "\\[Control]\\[Shift]\\[space]"];
                   process.run(false, args, args.length);

    let engines = util.suggest.getEngines();

    // If you want to use all available suggest engines,
    // change suggestEngines value to util.suggest.filterEngines(engines);

    let suggestEngines = [util.suggest.ss.getEngineByName("Google")];
    let collection = engines.map(

	function (engine)[(engine.iconURI || {
            spec: ""
	}).spec, engine.name, engine.description]);

    prompt.selector({
        message: "engine:",
        collection: collection,
        flags: [ICON | IGNORE, 0, 0],
        header: ["Name", "Description"],
        keymap: {
            "s": "prompt-decide",
            "j": "prompt-next-completion",
            "k": "prompt-previous-completion"
        },
        callback: function (i) {
            if (i >= 0) util.suggest.searchWithSuggest(engines[i], suggestEngines, "tab");
        }
    });
}, "サジェスト検索", true);

key.setViewKey('s', function() {
        function mySearch(word){
            var query = "q=" + encodeURIComponent(word);

            BrowserOpenTab();
            loadURI("http://www.google.co.jp/search?" + query);
        }
        prompt.read("Search [Google]:", mySearch, null, null, null, 0, "my-google-search");
    }, 'Google検索');

key.setViewKey('i', function() {
    function mySearch(word){
        var query = "q=" + encodeURIComponent(word);
	loadURI("http://www.google.co.jp/search?" + query);
    }
    var query = content.location.href
    var word = query.substr(query.lastIndexOf("q=")+2)
    if(word.indexOf("&")!=-1) word = word.substr(0,word.indexOf("&"));
    wordlist = word.split(/\+|%20/)
    
    after_wordlist = []
    for(var w in wordlist){
	after_wordlist.push(decodeURI(wordlist[w]))
    }
    
    prompt.read("Search [Google]:", mySearch, null, null, after_wordlist.join(" "), 0, "my-google-search");
}, '検索ワードをコピーして検索');


key.setViewKey('b', function (ev, arg) {
    ext.exec("bmany-list-all-bookmarks", arg, ev);
}, "bmany - ブックマークを一覧表示");

key.setViewKey([':', 'B'], function (ev, arg) {
    ext.exec("bmany-list-bookmarklets", arg, ev);
}, "bmany - ブックマークレットを一覧表示");

key.setViewKey([':', 'k'], function (ev, arg) {
    ext.exec("bmany-list-bookmarks-with-keyword", arg, ev);
}, "bmany - キーワード付きブックマークを一覧表示");

key.setViewKey("y", function (ev) {
	command.setClipboardText(content.location.href);
}, 'URLをコピー', true);


// ============================= CARET ============================== //
key.setCaretKey([["C-a"], ["^"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
            }, 'キャレットを行頭へ移動', false);

key.setCaretKey([["C-e"], ["$"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
            }, 'キャレットを行末へ移動', false);

key.setCaretKey([["C-n"], ["j"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
            }, 'キャレットを一行下へ', false);

key.setCaretKey([["C-p"], ["k"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
            }, 'キャレットを一行上へ', false);

key.setCaretKey([["C-f"], ["l"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
            }, 'キャレットを一文字右へ移動', false);

key.setCaretKey([["C-b"], ["h"], ["C-h"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
            }, 'キャレットを一文字左へ移動', false);

key.setCaretKey([["M-f"], ["w"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
            }, 'キャレットを一単語右へ移動', false);

key.setCaretKey([["M-b"], ["W"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
            }, 'キャレットを一単語左へ移動', false);

key.setCaretKey([["C-v"], ["SPC"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
            }, 'キャレットを一画面分下へ', false);

key.setCaretKey([["M-v"], ["b"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
            }, 'キャレットを一画面分上へ', false);

key.setCaretKey([["M-<"], ["g"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
            }, 'キャレットをページ先頭へ移動', false);

key.setCaretKey([["M->"], ["G"]], function (ev) {
                ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
            }, 'キャレットを行末へ移動', false);

key.setCaretKey('J', function (ev) {
                util.getSelectionController().scrollLine(true);
            }, '画面を一行分下へスクロール', false);

key.setCaretKey('K', function (ev) {
                util.getSelectionController().scrollLine(false);
            }, '画面を一行分上へスクロール', false);

key.setCaretKey(',', function (ev) {
                util.getSelectionController().scrollHorizontal(true);
                goDoCommand("cmd_scrollLeft");
            }, '左へスクロール', false);

key.setCaretKey('.', function (ev) {
                goDoCommand("cmd_scrollRight");
                    util.getSelectionController().scrollHorizontal(false);
            }, '右へスクロール', false);

key.setCaretKey('z', function (ev) {
                command.recenter(ev);
            }, 'キャレットの位置までスクロール', false);

key.setCaretKey([["C-SPC"], ["C-@"]], function (ev) {
                command.setMark(ev);
            }, 'マークをセット', true);

key.setCaretKey(':', function (ev, arg) {
                shell.input(null, arg);
            }, 'コマンドの実行', true);

key.setCaretKey('R', function (ev) {
                BrowserReload();
            }, '更新', true);

key.setCaretKey([["B"],["H"]], function (ev) {
                BrowserBack();
            }, '戻る', false);

key.setCaretKey('F', function (ev) {
                BrowserForward();
            }, '進む', false);

key.setCaretKey(["C-x", "h"], function (ev) {
                goDoCommand("cmd_selectAll");
            }, 'すべて選択', true);

key.setCaretKey('f', function (ev) {
                command.focusElement(command.elementsRetrieverTextarea, 0);
            }, '最初のインプットエリアへフォーカス', true);

key.setCaretKey('M-p', function (ev) {
                command.walkInputElement(command.elementsRetrieverButton, true, true);
            }, '次のボタンへフォーカスを当てる', false);

key.setCaretKey('M-n', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, '前のボタンへフォーカスを当てる', false);
