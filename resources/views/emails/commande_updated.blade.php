<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commande Mise à Jour</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            margin: auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #007bff;
            text-align: center;
        }
        p {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Commande Mise à Jour</h2>
        <p><strong>Commande N°</strong>{{ $commande->id }}</p>
        <p><strong>Date de livraison prévu :</strong> {{ $commande->date }}</p>
        <p><strong>Statut :</strong> {{ $commande->status }}</p>
        <p>Merci d'utiliser notre système.</p>
        <div class="footer">
            &copy; {{ date('Y') }} BenYaghlaneShops. Tous droits réservés.
        </div>
    </div>
</body>
</html>
