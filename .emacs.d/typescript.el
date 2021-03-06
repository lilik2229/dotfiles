;;; package --- Summary
;;; Commentary:

;;; typescript

;;; Code:

;; typescript-mode
(require 'typescript-mode)
(add-to-list 'auto-mode-alist '("\\.ts\\'" . typescript-mode))
(setq typescript-indent-level 2)

(require 'tide)
(add-hook 'typescript-mode-hook
          (lambda ()
            (tide-setup)
            (flycheck-mode t)
            (setq flycheck-check-syntax-automatically '(save mode-enabled))
            (eldoc-mode t)
            (company-mode-on)
            )
          )

;; 依存関係のあるモジュールを読み込み
(require 'company)

;;; typescript.el ends here
