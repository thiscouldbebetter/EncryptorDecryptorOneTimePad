
class EncryptionKey
{
	constructor
	(
		messageLengthMaxInSymbols,
		symbolsPossibleCount,
		numbersToEncryptWith
	)
	{
		this.messageLengthMaxInSymbols =
			messageLengthMaxInSymbols;
		this.symbolsPossibleCount =
			symbolsPossibleCount || 256;
		this.numbersToEncryptWith = numbersToEncryptWith;
	}

	static fromMessageLengthMaxInSymbols(messageLengthMaxInSymbols)
	{
		var returnKey = new EncryptionKey
		(
			messageLengthMaxInSymbols
		);

		return returnKey;
	}

	static fromStringOfDecimals(numbersToEncryptWithAsStringOfDecimals)
	{
		var numbersToEncryptWithAsDecimals =
			numbersToEncryptWithAsStringOfDecimals.split(" ");
		var numbersToEncryptWith =
			numbersToEncryptWithAsDecimals.map(x => parseInt(x) );

		var returnKey = new EncryptionKey
		(
			numbersToEncryptWith.length, // messageLengthMaxInSymbols,
			null, // symbolsPossibleCount
			numbersToEncryptWith
		);

		return returnKey;
	}

	decryptNumbers(numbersToDecrypt)
	{
		var numbersDecrypted = [];

		var symbolCount = Math.min
		(
			numbersToDecrypt.length,
			this.numbersToEncryptWith.length
		);

		for (var i = 0; i < symbolCount; i++)
		{
			var numberToDecryptWith = this.numbersToEncryptWith[i];
			var numberToDecrypt = numbersToDecrypt[i];
			var difference =
				numberToDecrypt
				- numberToDecryptWith
			difference += this.symbolsPossibleCount;
			var remainder = difference % this.symbolsPossibleCount;
			numbersDecrypted.push(remainder);
		}

		return numbersDecrypted;
	}

	encryptNumbers(numbersToEncrypt)
	{
		var numbersEncrypted = [];

		var symbolCount = Math.min
		(
			numbersToEncrypt.length,
			this.numbersToEncryptWith.length
		);

		for (var i = 0; i < symbolCount; i++)
		{
			var numberToEncryptWith = this.numbersToEncryptWith[i];
			var numberToEncrypt = numbersToEncrypt[i];
			var sum = numberToEncrypt + numberToEncryptWith;
			var remainder = sum % this.symbolsPossibleCount;
			numbersEncrypted.push(remainder);
		}

		return numbersEncrypted;
	}

	generateWithPseudorandomNumbers()
	{
		this.numbersToEncryptWith = [];

		for (var i = 0; i < this.messageLengthMaxInSymbols; i++)
		{
			var numberRandom = Math.floor
			(
				Math.random() * this.symbolsPossibleCount
			);

			this.numbersToEncryptWith.push(numberRandom);
		}
	}

	toStringDecimals()
	{
		return this.numbersToEncryptWith.map
		(
			x => x.toString().padStart(3, "0")
		).join(" ");
	}
}
