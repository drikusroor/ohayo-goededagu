# Scripts

## Tar & encrypt w/ gpg

The tar command itself does not support password protection or encryption directly. To create a password-protected archive, you would typically need to use an encryption tool in conjunction with tar, such as gpg (GNU Privacy Guard) or openssl.

Here's how you could do it with gpg:

First, create a tarball without compression:


```bash
tar -cf images.tar -C images .
```

Then, encrypt the tarball using gpg with a passphrase:

```bash
gpg -c --cipher-algo AES256 images.tar
```

This will prompt you for a passphrase. The tarball will be encrypted to images.tar.gpg.

To decrypt and extract the contents later, you would use:

```bash
gpg -d images.tar.gpg | tar -xvf -
```

It will prompt you for the passphrase that was set during encryption.

## Split

To split a file into chunks of 99 MB (or any other size) in a Unix-like environment, you can use the split command. The split command is a standard utility for splitting files into fixed-size pieces. Here's how you would use it to split a file into 99 MB chunks:

```bash
split -b 99m -d images.tar.gpg images_tar_gpg_part_
```

To reassemble these files back into the original yourfile.tar, you would use the cat command:

```bash
cat yourfile_part_* > yourfile.tar
```

Make sure to execute this command in a directory that only contains the chunks for this specific file, and that the chunks are named in such a way that when sorted alphabetically by filename, they are in the correct order.

## 7-zip]

To install p7zip on macOS using Homebrew, you can run the following command in the terminal:

```bash
brew install p7zip
```

After installing p7zip, you can use the 7z command to archive files into password-protected chunks. Here's an example command:

```bash
7z a -v99m -pYOUR_PASSWORD -mhe=on archive.7z /path/to/folder/*
```

Replace YOUR_PASSWORD with your actual password and /path/to/folder/* with the actual path to the files you want to archive. The -v99m option specifies the chunk size (99 MB), -p sets the password, and -mhe=on option enables header encryption.
