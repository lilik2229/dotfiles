;;; package --- Summary
;;; Commentary:

;;; Code:
;; cask
(require 'cask "~/.cask/cask.el")
(cask-initialize)

;;;
;;; Japanese Input Method
;;;

;; emacs-mozc

;(require 'mozc)
;(setq default-input-method "japanese-mozc")

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

;; kill tool-bar and menu-bar
(tool-bar-mode -1)
(menu-bar-mode -1)

;;ビープ音停止
(setq visible-bell t)
(setq ring-bell-function 'ignore)

;;背景
(load-theme 'misterioso t)

;;スクロールバー排除
(set-scroll-bar-mode nil)

;;ファイル名大文字小文字の区別なしで補完
(setq completion-ignore-case t)

;;; 現在行を目立たせる．
(require 'hl-line)
(global-hl-line-mode)
(setq hl-line-face 'underline)


;;; 一行が 80 字以上になった時には自動改行する
(setq fill-column 80)
(setq-default auto-fill-mode t)

;;hide-show
(require 'hideshow)

;; minibuffer
(define-key minibuffer-local-completion-map "\C-w" 'backward-kill-word)

;;;
;;; jump window with C-,
;;; switch buffer with C-M-,
;;;
(defun other-window-or-split ()
  "Other-window-or-split."
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

;;フォント
(add-to-list 'default-frame-alist '(font . "ricty-26"))

;; mac setting
(mac-auto-ascii-mode 1)

;; magit
(global-set-key (kbd "C-x g") 'magit-status)
(global-set-key (kbd "C-x C-g") 'magit-status)

(provide 'common)
;;; common.el ends here

