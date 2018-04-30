;;; package --- Summary
;;; Commentary:

;;; auto-complete

;;; Code:

(require 'auto-complete-config)
(ac-config-default)
;; ;; C-n/C-p で候補を選択
(define-key ac-complete-mode-map "\C-n" 'ac-next)
(define-key ac-complete-mode-map "\C-p" 'ac-previous)

;;; auto-complete.el ends here
