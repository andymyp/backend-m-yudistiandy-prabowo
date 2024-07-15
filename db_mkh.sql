-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jul 2024 pada 17.03
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mkh`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`customer_id`, `user_id`, `name`, `address`, `phone`, `created_at`, `updated_at`) VALUES
(1, 17, 'Customer 1', 'Jl. Kembali 1', '0237472634', '2024-07-15 18:05:17', '2024-07-15 18:05:17'),
(2, 20, 'Customer 2', 'Jl. Kembali 2', '0237472634', '2024-07-15 21:36:18', '2024-07-15 21:36:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `merchant`
--

CREATE TABLE `merchant` (
  `merchant_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `merchant`
--

INSERT INTO `merchant` (`merchant_id`, `user_id`, `name`, `address`, `phone`, `created_at`, `updated_at`) VALUES
(1, 7, 'Andy', 'Jl. Kembali', '0237472634', '2024-07-15 17:40:18', '2024-07-15 17:40:18'),
(2, 18, 'Merchant 1', 'Jl. Kembali 1', '0237472634', '2024-07-15 19:50:33', '2024-07-15 19:50:33'),
(3, 19, 'Merchant 2', 'Jl. Kembali 2', '0237472634', '2024-07-15 20:31:49', '2024-07-15 20:31:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `merchant_id`, `name`, `description`, `price`, `created_at`, `updated_at`) VALUES
(1, 2, 'Product 1', 'Description product 1', 10000, '2024-07-15 20:26:32', '2024-07-15 20:26:32'),
(2, 2, 'Product 2', 'Description product 2', 16000, '2024-07-15 20:27:53', '2024-07-15 20:27:53'),
(3, 2, 'Product 3', 'Description product 3', 56000, '2024-07-15 20:30:34', '2024-07-15 20:30:34'),
(4, 3, 'Product 4', 'Description product 4', 10000, '2024-07-15 20:34:15', '2024-07-15 20:34:15'),
(5, 3, 'Product 5', 'Description product 5', 52000, '2024-07-15 20:34:46', '2024-07-15 20:50:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `shipping_cost` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `customer_id`, `product_id`, `discount`, `shipping_cost`, `price`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, 10000, 10000, 20000, '2024-07-15 21:33:31', '2024-07-15 21:33:31'),
(2, 1, 2, 0, 0, 16000, 16000, '2024-07-15 21:34:21', '2024-07-15 21:34:21'),
(3, 1, 3, 10, 0, 56000, 50400, '2024-07-15 21:34:49', '2024-07-15 21:34:49'),
(4, 2, 2, 0, 0, 16000, 16000, '2024-07-15 21:37:11', '2024-07-15 21:37:11'),
(5, 2, 5, 10, 0, 52000, 46800, '2024-07-15 21:37:53', '2024-07-15 21:37:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `user_type` int(11) NOT NULL,
  `access_token` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `user_type`, `access_token`, `created_at`, `updated_at`) VALUES
(7, 'andy@mail.com', '$2b$10$/jAAHJyhbBqh5CigU74wiuA3tNE3YIGm8n1QCXnbBREDhq0IvnWiK', 0, NULL, '2024-07-15 17:40:18', '2024-07-15 17:40:18'),
(17, 'customer1@mail.com', '$2b$10$r5i8N4CtWTgzzB3GjNgoBODiNHfz5e7h1nzWrMcaHmKo4mXSSi/CC', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMUBtYWlsLmNvbSIsImlhdCI6MTcyMTA1MjQwOCwiZXhwIjoxNzIxMTM4ODA4fQ.2-GWN7eKSbgnXpqZmLZv0rHDq9OBmtOgA22dpYUydBw', '2024-07-15 18:05:17', '2024-07-15 21:06:48'),
(18, 'merchant1@mail.com', '$2b$10$4ABzZpEABzeTPU1/dOkSSOnxw5IAAkNj4H7gkYFkNTmML7hdnZZfK', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lcmNoYW50MUBtYWlsLmNvbSIsImlhdCI6MTcyMTA1NTUxNiwiZXhwIjoxNzIxMTQxOTE2fQ.jc0lCChk8E-N_-ci0BwuBdhEUkpknOHAyh3ZuZEnRrk', '2024-07-15 19:50:33', '2024-07-15 21:58:36'),
(19, 'merchant2@mail.com', '$2b$10$HUbASrA2hXB.rfdbvQ7HBeOl1lrL6fdnTR5Fcmr/DVFoJzfF/57Bi', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lcmNoYW50MkBtYWlsLmNvbSIsImlhdCI6MTcyMTA1NTYxOSwiZXhwIjoxNzIxMTQyMDE5fQ.6lLltg0hxwqG-VWk0dwndZkyUNFFY_54jkjLrB0maXw', '2024-07-15 20:31:49', '2024-07-15 22:00:19'),
(20, 'customer2@mail.com', '$2b$10$bZ4XTIH3l30PH/n6HKYG7Op3NunNL8LToMnJJUd9R3SxbS9nfVBau', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMkBtYWlsLmNvbSIsImlhdCI6MTcyMTA1NDE4OSwiZXhwIjoxNzIxMTQwNTg5fQ.kMAl6-TuNYOQwy5ukin_EQsfMcDG5OuLisjqy7a_xks', '2024-07-15 21:36:18', '2024-07-15 21:36:29');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`merchant_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `merchant_id` (`merchant_id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `customer_id` (`customer_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `merchant`
--
ALTER TABLE `merchant`
  MODIFY `merchant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `merchant`
--
ALTER TABLE `merchant`
  ADD CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
