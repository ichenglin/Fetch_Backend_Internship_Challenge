<div align="center">
	<h1>Fetch Backend Internship Challenge</h1>
	<p>Coding challenge for Fetch summer 2024 backend engineering internship application.</p>
	<img src="https://github.com/ichenglin/Fetch_Backend_Internship_Challenge/assets/41904540/256888b2-6b28-4b8e-9852-13e9dc377b96" alt="API Terminal Demo">
</div>

## Installation

1. Please make sure you have **[Node.js](https://nodejs.org/en/download)** installed on **your device**, this can be **checked** by executing the command **`node -v`** in the **terminal**.
   If **[Node.js](https://nodejs.org/en/download)** is already **installed**, the terminal should print out the **last installed version** (such as **`v00.00.0`**); if the message doesn't appear,
   please install **[Node.js](https://nodejs.org/en/download)** from their **[website](https://nodejs.org/en/download)**.
2. To **clone the repository** we need to make sure we have **[Git](https://github.com/git-guides/install-git)** installed, and this can be **checked** by executing the command **`git --version`** in the **terminal**.
   A device with **[Git](https://github.com/git-guides/install-git)** installed will return the **last installed version**; if the message doesn't appear, please follow the
   **[guide from Github](https://github.com/git-guides/install-git)** to install **[Git](https://github.com/git-guides/install-git)**.
3. Open a **terminal** and **navigate to the folder** you want **[this repository](https://github.com/ichenglin/Fetch_Backend_Internship_Challenge)** to be cloned in using **`cd <path>`**, then execute the command
   **`git clone https://github.com/ichenglin/Fetch_Backend_Internship_Challenge.git`** to **clone** the repository.
5. Install the **required dependencies and development dependencies** by executing the command **`npm install`**, this command is from **[Node Package Manager](https://github.com/npm/cli)** and should comes
   **bundled** with **[Node.js](https://nodejs.org/en/download)** you installed earlier *(you **don't** have to manually install Node Package Manager, just execute the command directly)*.

> By following the steps above you should have the **repository and all of its dependencies installed**, please refer to the **next section** below on how to **compile and run** the program.

## Compile & Run

Normally **[TypeScript](https://www.typescriptlang.org/)** projects require the programmer to **manually compile** the **[TypeScript](https://www.typescriptlang.org/)** source code into 
**[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**; however, in this project we already have it set up to **automatically compile** using 
**[npm-run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)** as listed below.

There's **two types** of command here, one with **only the full implementation** of the coding challenge (**`npm run start`**) and the other with **additional sample code** test (**`npm run sample`**).

> | Command                 | Full Implementation | Sample Solution | Usage                                |
> | ----------------------- | :-----------------: | :-------------: | ------------------------------------ |
> | **`npm run start`**     | ⭕                  | ❌             | Manually interact with the endpoints |
> | **`npm run sample`**    | ⭕                  | ⭕             | View output from sample solution     |

More specifically, if you want to **test the functionality** of the program then execute the **first** command **`npm run start`**. On the other hand, if you would like to look at the **program output from sample solution**,
run the **second** command **`npm run sample`**.

## Configuration

In this program, **[Dotenv](https://www.npmjs.com/package/dotenv)** is used to **seperate program credentials** *(such as database logins, which is not used in this program)* **from the source code**. If the port 8000 is already
in use or you simply want a **custom port** to be used by the program, you can easily **set a new port** from editing the **[.env](https://github.com/ichenglin/Fetch_Backend_Internship_Challenge/blob/main/.env)** file in the root folder of the program.