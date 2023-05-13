
class UiEventHandler
{
	static buttonDecrypt_Clicked()
	{
		var d = document;
		var textareaEncryptionKeyAsDecimals =
			d.getElementById("textareaEncryptionKeyAsDecimals");
		var encryptionKeyAsStringOfDecimals =
			textareaEncryptionKeyAsDecimals.value;

		if (encryptionKeyAsStringOfDecimals.trim() == "")
		{
			alert("No encryption key specified!");
			return;
		}

		var encryptionKey;
		try
		{
			encryptionKey =
				EncryptionKey.fromStringOfDecimals(encryptionKeyAsStringOfDecimals);
		}
		catch (err)
		{
			alert("Error parsing encryption key!");
			return;
		}

		var textareaMessageEncrypted =
			d.getElementById("textareaMessageEncrypted");
		var messageEncryptedAsStringOfDecimals =
			textareaMessageEncrypted.value;
		var messageEncryptedAsNumbers
			= messageEncryptedAsStringOfDecimals.split(" ").map(x => parseInt(x) );

		var messageUnencryptedAsNumbers =
			encryptionKey.decryptNumbers(messageEncryptedAsNumbers);

		var messageUnencryptedAsStringOfDecimals =
			messageUnencryptedAsNumbers.map
			(
				x => x.toString().padStart(3, "0")
			).join(" ");

		var textareaMessageUnencryptedAsNumbers =
			d.getElementById("textareaMessageUnencryptedAsNumbers");
		textareaMessageUnencryptedAsNumbers.value =
			messageUnencryptedAsStringOfDecimals;

		UiEventHandler.buttonMessageUnencryptedNumbersToText_Clicked();
	}

	static buttonEncrypt_Clicked()
	{
		var d = document;
		var textareaEncryptionKeyAsDecimals =
			d.getElementById("textareaEncryptionKeyAsDecimals");
		var encryptionKeyAsStringOfDecimals =
			textareaEncryptionKeyAsDecimals.value;

		if (encryptionKeyAsStringOfDecimals.trim() == "")
		{
			alert("No encryption key specified!");
			return;
		}

		var encryptionKey;
		try
		{
			encryptionKey =
				EncryptionKey.fromStringOfDecimals(encryptionKeyAsStringOfDecimals);
		}
		catch (err)
		{
			alert("Error parsing encryption key!");
			return;
		}

		var textareaMessageUnencryptedAsNumbers =
			d.getElementById("textareaMessageUnencryptedAsNumbers");
		var numbersToEncryptAsStringOfDecimals =
			textareaMessageUnencryptedAsNumbers.value;
		var numbersToEncrypt =
			numbersToEncryptAsStringOfDecimals.split(" ").map(x => parseInt(x) );
		var messageEncryptedAsNumbers
			= encryptionKey.encryptNumbers(numbersToEncrypt);
		var messageEncryptedAsStringOfDecimals
			= messageEncryptedAsNumbers.map
			(
				x => x.toString().padStart(3, "0")
			).join(" ");

		var textareaMessageEncrypted =
			d.getElementById("textareaMessageEncrypted");
		textareaMessageEncrypted.value =
			messageEncryptedAsStringOfDecimals;
	}

	static buttonGenerate_Clicked()
	{
		var d = document;
		var inputMessageLengthMaxInSymbols =
			d.getElementById("inputMessageLengthMaxInSymbols");
		var messageLengthMaxInSymbolsAsString =
			inputMessageLengthMaxInSymbols.value;
		var messageLengthMaxInSymbols =
			parseInt(messageLengthMaxInSymbolsAsString);
		var encryptionKey =
			EncryptionKey.fromMessageLengthMaxInSymbols(messageLengthMaxInSymbols);
		encryptionKey.generateWithPseudorandomNumbers();
		var encryptionKeyAsStringDecimals =
			encryptionKey.toStringDecimals();
		var textareaEncryptionKeyAsDecimals =
			d.getElementById("textareaEncryptionKeyAsDecimals");
		textareaEncryptionKeyAsDecimals.value =
			encryptionKeyAsStringDecimals;
	}

	static buttonMessageLoadDemo_Clicked()
	{
		var d = document;
		var textToEncrypt = "This is a test!";

		var textareaMessageUnencryptedAsText =
			d.getElementById("textareaMessageUnencryptedAsText");
		textareaMessageUnencryptedAsText.value = textToEncrypt;

		UiEventHandler.buttonMessageUnencryptedTextToNumbers_Clicked();
	}

	static buttonMessageUnencryptedNumbersToText_Clicked()
	{
		var d = document;

		var textareaMessageUnencryptedAsNumbers =
			d.getElementById("textareaMessageUnencryptedAsNumbers");
		var messageAsNumbers =
			textareaMessageUnencryptedAsNumbers.value;

		var messageAsText = messageAsNumbers.split(" ").map
		(
			x => String.fromCharCode(parseInt(x))
		).join("");

		var textareaMessageUnencryptedAsText =
			d.getElementById("textareaMessageUnencryptedAsText");
		textareaMessageUnencryptedAsText.value = messageAsText;
	}

	static buttonMessageUnencryptedTextToNumbers_Clicked()
	{
		var d = document;

		var textareaMessageUnencryptedAsText =
			d.getElementById("textareaMessageUnencryptedAsText");
		var messageAsText =
			textareaMessageUnencryptedAsText.value;

		var messageAsNumbers = messageAsText.split("").map
		(
			x => ("" + x.charCodeAt(0)).padStart(3, "0")
		).join(" ");

		var textareaMessageUnencryptedAsNumbers =
			d.getElementById("textareaMessageUnencryptedAsNumbers");
		textareaMessageUnencryptedAsNumbers.value = messageAsNumbers;
	}

}
