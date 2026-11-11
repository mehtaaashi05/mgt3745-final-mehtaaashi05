# PROJECT.md

Status: ACTIVE.

An intern on one team becomes curious about another and wants firsthand information before deciding whether to pursue a move, without signaling dissatisfaction or requesting a transfer. The product goal is to help the intern find an opted-in employee for one short, informal, no-commitment conversation. This static prototype supports search and curated examples only; conversation requests, manager visibility, and a no-standing-impact guarantee remain outside its implementation.

## Problem statement

Interns often want firsthand information about another team but hesitate to ask
because curiosity can look like dissatisfaction or a transfer request. This
directory gives them a low-commitment way to find an employee who has opted in
to a short conversation, while keeping the example data fictional and
non-sensitive.

## Who it is for

Primary users are hesitant interns exploring another team's work. Secondary
users are employees willing to describe their work and managers who need the
activity framed as ordinary development rather than a transfer signal.

## Scope

In: searching a curated list of employees who opted in to a short conversation,
and preparing a local opt-in request file for manual review. A maintainer
reviews requests and republishes the static directory. Out: immediate
submission, messaging, identity verification, transfer requests, and manager
approvals. Deferred: accounts, private entries, self-service opt-out, and
automated removal workflows.

## Constraints

The project is a zero-budget static site with a checked-in JSON directory and
no application server. The current directory contains fictional, non-sensitive
examples. Any published directory data is publicly readable; real employee
details must not be added without explicit approval and an appropriate
publishing process. The opt-in form creates a local request file and sends
nothing. See [ARCHITECTURE.md](ARCHITECTURE.md) and ADR-003.
