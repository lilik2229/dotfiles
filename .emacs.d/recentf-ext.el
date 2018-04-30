;;; package --- Summary
;;; Commentary:

;;; recentf-ext

;;; Code:

;;recentf-ext
(require 'recentf-ext)
;; 自動保存
(when (require 'recentf-ext nil t)
  (setq recentf-max-saved-items 2000)
  (setq recentf-exclude '(".recentf"))
  (setq recentf-auto-cleanup 10)
  (defvar recentf-auto-save-timer
    (run-with-idle-timer 30 t 'recentf-save-list))
  (recentf-mode 1))

;; 起動画面削除
(setq inhibit-startup-message t)

;; 起動画面で recentf を開く
(add-hook 'after-init-hook (lambda()
    (recentf-open-files)
    ))

;; キーバインド
(global-set-key (kbd "C-x C-r") 'recentf-open-files)


;;; recentf-ext.el ends here
