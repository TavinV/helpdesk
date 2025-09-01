const verifyEmailTemplate = (code) => {
    return `
        <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificação de Duas Etapas - Helpdesk</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7f9;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #2563eb;
            color: white;
            padding: 25px;
            text-align: center;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .content {
            padding: 30px;
        }

        h1 {
            color: #2563eb;
            margin-bottom: 20px;
            font-size: 24px;
        }

        p {
            margin-bottom: 15px;
            color: #4b5563;
        }

        .verification-code {
            background: #f1f5f9;
            border: 1px dashed #2563eb;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            margin: 25px 0;
        }

        .code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #2563eb;
            padding: 10px;
        }

        .warning {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
            font-weight: 500;
        }

        .support-info {
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
        }

        .icon {
            font-size: 48px;
            color: #2563eb;
            margin-bottom: 15px;
        }

        @media (max-width: 600px) {
            .content {
                padding: 20px;
            }

            .code {
                font-size: 24px;
                letter-spacing: 4px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
        </div>

        <div class="content">

            <h1>Verificação de Duas Etapas</h1>

            <p>Olá,</p>

            <p>Foi solicitada uma verificação de duas etapas para a sua conta no sistema Helpdesk. Utilize o código
                abaixo para completar o processo:</p>

            <div class="verification-code">
                <div class="code" id="verificationCode">${code}</div>
            </div>

            <div class="warning">
                <strong>Importante:</strong> Se você não solicitou este código, ignore este e-mail ou entre em contato
                com nossa equipe de suporte imediatamente.
            </div>

            <div class="support-info">
                <p><strong>Equipe Helpdesk</strong><br>
                    Suporte Técnico em TI<br>
                    Email: suporte@helpdesk.com<br>
                    Telefone: (11) 3456-7890</p>
            </div>
        </div>

        <div class="footer">
            <p>© 2023 Helpdesk - Todos os direitos reservados.</p>
            <p>Este é um e-mail automático, por favor não responda.</p>
        </div>
    </div>
</body>

</html>
    `;
};

export default verifyEmailTemplate;