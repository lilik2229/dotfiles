;;; package --- Summary
;;; Commentary:

;;; flycheck

;;; Code:

(require 'flycheck)
(add-hook 'after-init-hook #'global-flycheck-mode)
(define-key global-map (kbd "C-c C-n")     'flycheck-next-error)
(define-key global-map (kbd "C-c n")     'flycheck-next-error)
(define-key global-map (kbd "C-c C-p")     'flycheck-previous-error)
(define-key global-map (kbd "C-c p")     'flycheck-previous-error)
;; disable jshint since we prefer eslint checking
(setq-default flycheck-disabled-checkers
  (append flycheck-disabled-checkers
    '(javascript-jshint)))
;; use eslint with web-mode for jsx files
(flycheck-add-mode 'javascript-eslint 'js2-mode)
;; (setq flycheck-eslintrc "~/.eslintrc")
(setq-default flycheck-temp-prefix ".")

;;; flycheck.el ends here

