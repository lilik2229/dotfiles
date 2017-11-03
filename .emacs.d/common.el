;;; package --- Summary
;;; Commentary:

;;; Code:

;; cask
(require 'cask "~/.cask/cask.el")
;;(require 'cask)
(cask-initialize)

;;;
;;; Key customize
;;;
(global-set-key [(control h)]	'delete-backward-char)
(global-set-key (kbd "S-SPC")	'toggle-input-method)
(add-hook 'mozc-mode-hook
  (lambda()
    (define-key mozc-mode-map (kbd "S-SPC") 'toggle-input-method)))

(global-set-key [(meta g)]	'goto-line)
(global-set-key [(meta c )]	'count-lines-region)
(define-key global-map (kbd "C-c C-r")     'eval-buffer)

(setq-default indent-tabs-mode nil)


;;;
;;; Language
;;;
(set-language-environment "Japanese")
(prefer-coding-system 'utf-8)
(set-terminal-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
(set-buffer-file-coding-system 'utf-8)

(set-default-coding-systems 'utf-8)
;; (setq file-name-coding-system 'shift_jis)
;;;
;;; Japanese Input Method
;;;

;; emacs-mozc

;(require 'mozc)
;(setq default-input-method "japanese-mozc")

;;;
;;; highlight
;;;
;; (require 'font-lock)
;; (turn-on-font-lock-if-enabled)
;; (global-font-lock-mode t)

(transient-mark-mode t)	; mark

(require 'paren)
(show-paren-mode t)	; paren

;;行番号表示
(global-linum-mode t)

;;;
;;; Mouse Wheel
;;;
(mwheel-install)
(setq mouse-wheel-follow-mouse t)


;;;
;;; tramp
;;;
(if (locate-library "tramp")
    (require 'tramp))

;;;
;;; emacsclient
;;;
(server-start)


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; GNU GLOBAL(gtags)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(require 'gtags)
(global-set-key "\M-t" 'gtags-find-tag)
(global-set-key "\M-r" 'gtags-find-rtag)
(global-set-key "\M-s" 'gtags-find-symbol)
(global-set-key "\C-t" 'gtags-pop-stack)

;; kill tool-bar and menu-bar
(tool-bar-mode -1)
(menu-bar-mode -1)

;;drill
;; (require 'drill-instructor)
;; (setq drill-instructor-global t)

;;ビープ音停止
(setq visible-bell t)
(setq ring-bell-function 'ignore)

;;背景
(load-theme 'misterioso t)

;;透過度
;;(set-frame-parameter nil 'alpha 80)

;;スクロールバー排除
(set-scroll-bar-mode nil)

;;ファイル名大文字小文字の区別なしで補完
(setq completion-ignore-case t)

;;バッファの自動読み込み
;(global-auto-revert-mode 1)

;;; 現在行を目立たせる．
(require 'hl-line)
(global-hl-line-mode)
(setq hl-line-face 'underline)

;;recentf-ext
(require 'recentf-ext)
;; 自動保存
(when (require 'recentf-ext nil t)
  (setq recentf-max-saved-items 2000)
  (setq recentf-exclude '(".recentf"))
  (setq recentf-auto-cleanup 10)
  ;; (setq recentf-auto-save-timer (run-with-idle-timer 30 t 'recentf-save-list))
  (defvar recentf-auto-save-timer (run-with-idle-timer 30 t 'recentf-save-list))
  (recentf-mode 1))

;; 起動画面削除
(setq inhibit-startup-message t)

;; 起動画面で recentf を開く
(add-hook 'after-init-hook (lambda()
    (recentf-open-files)
    ))

;; キーバインド
(global-set-key (kbd "C-x C-r") 'recentf-open-files)

;;; 一行が 80 字以上になった時には自動改行する
(setq fill-column 80)
(setq-default auto-fill-mode t)

;;auto-complete
(require 'auto-complete-config)
(ac-config-default)
;; ;; C-n/C-p で候補を選択
(define-key ac-complete-mode-map "\C-n" 'ac-next)
(define-key ac-complete-mode-map "\C-p" 'ac-previous)


;;hide-show
(require 'hideshow)


;;;
;;; 範囲指定していない時、C-wで前の単語を削除
;;;
;; (defadvice kill-region (around kill-word-or-kill-region activate)
;;   (if (and (called-interactively-p) transient-mark-mode (not mark-active))
;;       (backward-kill-word 1)
;;     ad-do-it))

;; minibuffer
(define-key minibuffer-local-completion-map "\C-w" 'backward-kill-word)

;; php-mode
(load "php-mode")

;;;
;;; jump window with C-,
;;; switch buffer with C-M-,
;;;
(defun other-window-or-split ()
  (interactive)
  (when (one-window-p)(split-window-horizontally))
  (other-window 1))
(global-set-key (kbd "C-,") 'other-window-or-split)
(global-set-key (kbd "C-M-,") 'next-buffer)

;;; バックアップファイルを作らない
(setq make-backup-files nil)
 
;;; 終了時にオートセーブファイルを消す
(setq delete-auto-save-files t)
 

;; ;; コピーした内容を PRIMARY,CLIPBOARD セクションにもコピーする
(set-clipboard-coding-system 'compound-text)
(cond (window-system (setq select-enable-clipboard t) ))
     
;; ;; C-y で CLIPBOARD の内容をペースト(ヤンク)する
;; ;; クリップボードの内容を kill-ring に追加してからヤンクします
;; ;; kill-ring に新しい内容を追加するとそちらが優先されます
;; (cond (window-system (global-set-key "\C-y" 'x-clipboard-yank)))

;;フォント
(add-to-list 'default-frame-alist '(font . "ricty-26"))

;;Jadeモード
(require 'sws-mode)
(require 'jade-mode)
(add-to-list 'auto-mode-alist '("\\.jade$" . jade-mode))

;; ;;coffeeモード
(require 'coffee-mode)
(defun coffee-custom()
  "coffee-mode-hook"
  (and (set (make-local-variable 'tab-width) 2)
       ;; (set (make-local-variable 'cofee-tab-width) 2))
       (defvar (make-local-variable 'cofee-tab-width) 2))
  )
(add-hook 'coffee-mode-hook
	  '(lambda() (coffee-custom))
	  )

;;;js2-modeの設定
(require 'js2-mode)
(add-to-list 'auto-mode-alist '("\\.js\\'" . js2-mode))

;;;lua-modeの設定
(require 'lua-mode)
;; (add-to-list 'auto-mode-alist '("\\.lua\\'" . lua-mode))


;;helm
(require 'helm-config)
(helm-mode 1)
(define-key global-map (kbd "M-x")     'helm-M-x)
(define-key global-map (kbd "C-x C-f") 'helm-find-files)
(define-key global-map (kbd "C-x C-r") 'helm-recentf)
(define-key global-map (kbd "M-y")     'helm-show-kill-ring)
(define-key global-map (kbd "C-c i")   'helm-imenu)
(define-key global-map (kbd "C-x b")   'helm-buffers-list)
(define-key global-map (kbd "C-x C-b")   'helm-buffers-list)

(define-key helm-map (kbd "C-h") 'delete-backward-char)
(define-key helm-find-files-map (kbd "C-h") 'delete-backward-char)
(define-key helm-find-files-map (kbd "TAB") 'helm-execute-persistent-action)
(define-key helm-read-file-map (kbd "TAB") 'helm-execute-persistent-action)

;;flycheck
;; (eval-after-load 'flycheck
;;   '(add-hook 'flycheck-mode-hook #'flycheck-cask-setup))
(require 'flycheck)
(add-hook 'after-init-hook #'global-flycheck-mode)
(define-key global-map (kbd "C-c C-n")     'flycheck-next-error)
(define-key global-map (kbd "C-c C-p")     'flycheck-previous-error)
;; disable jshint since we prefer eslint checking
(setq-default flycheck-disabled-checkers
  (append flycheck-disabled-checkers
    '(javascript-jshint)))
;; use eslint with web-mode for jsx files
(flycheck-add-mode 'javascript-eslint 'js2-mode)
(setq js2-include-browser-externs nil)
(setq js2-mode-show-parse-errors nil)
(setq js2-mode-show-strict-warnings nil)
(setq js2-highlight-external-variables nil)
(setq js2-include-jslint-globals nil)
;; (setq flycheck-eslintrc "~/.eslintrc")
(setq-default flycheck-temp-prefix ".")

;;markdown
(require 'markdown-mode)
(add-to-list 'auto-mode-alist '("\\.md\\'" . markdown-mode))

;;jedi
(add-hook 'python-mode-hook #'jedi:setup)
;; (setq jedi:complete-on-dot t)

;;web-mode
(add-to-list 'auto-mode-alist '("\\.html\\'" . web-mode))

;;autopep8
(require 'py-autopep8)
(setq py-autopep8-options '("--max-line-length=200"))
(setq flycheck-flake8-maximum-line-length 200)
(add-hook 'python-mode-hook 'py-autopep8-enable-on-save)


;;emmet-mode
(require 'emmet-mode)
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'html-mode-hook 'emmet-mode)
(add-hook 'css-mode-hook 'emmet-mode)
(add-hook 'emmet-mode '(lambda()
			 (setq emmet-indentation 2)))
(define-key emmet-mode-keymap (kbd "C-j")     'emmet-expand-line)

;; mac setting
(mac-auto-ascii-mode 1)

;; magit
(global-set-key (kbd "C-x g") 'magit-status)
(global-set-key (kbd "C-x C-g") 'magit-status)

(provide 'common)
;;; common.el ends here


